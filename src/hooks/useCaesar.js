import { useContext, useEffect, useState } from 'react'
import { request, gql } from 'graphql-request'
import { applySnapshot } from 'mobx-state-tree'
import ASYNC_STATES from 'helpers/asyncStates'
import { config } from 'config'
import AppContext from 'stores'

async function fetchAggregations(subjectID, workflowID) {
  if (!workflowID) throw Error('Can\'t fetch aggregations without a valid workflow')

  const query = gql`{
    workflow(id: ${workflowID}) {
      reductions(subjectId: ${subjectID}) {
        data
      }
      extracts(subjectId: ${subjectID}) {
        data
      }
    }
  }`

  return await request(config.caesar, query)
}

export default function useCaesar(subjectID, workflowID) {
  const store = useContext(AppContext)
  const [data, setData] = useState(null)
  const [error, setError] = useState()
  const [loadingState, setLoadingState] = useState(ASYNC_STATES.IDLE)

  useEffect(() => {
    async function loadData() {
      setLoadingState(ASYNC_STATES.LOADING)
      try {
        const newData = await fetchAggregations(subjectID, workflowID)
        setData(newData)
        setLoadingState(ASYNC_STATES.READY)
      } catch (error) {
        console.error(error)
        setError(error.message)
        setLoadingState(ASYNC_STATES.ERROR)
      }
    }

    loadData(subjectID, workflowID)
  }, [subjectID, workflowID])

  useEffect(() => {
    if (loadingState === ASYNC_STATES.READY) {
      applySnapshot(store.aggregations, {
        current: data,
        asyncState: loadingState
      })
      store.aggregations.extractData()
    }
    if (loadingState === ASYNC_STATES.ERROR) {
      applySnapshot(store.aggregations, {
        error,
        asyncState: loadingState
      })
    }
  }, [data, error, loadingState, store.aggregations])
}