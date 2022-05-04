import { useContext, useEffect, useState } from 'react'
import { request, gql } from 'graphql-request'
import { applySnapshot } from 'mobx-state-tree'
import ASYNC_STATES from 'helpers/asyncStates'
import { config } from 'config'
import AppContext from 'stores'

async function fetchAggregations(subjectID, workflowID, extractorKey, reducerKey) {
  let extractsParams = `subjectId: ${subjectID}`
  let reductionsParams = `subjectId: ${subjectID}`

  if (extractorKey) {
    extractsParams = `${extractsParams}, extractorKey: "${extractorKey}"`
  }

  if (reducerKey) {
    reductionsParams = `${reductionsParams}, reducerKey: "${reducerKey}"`
  }

  const query = gql`{
    workflow(id: ${workflowID}) {
      reductions(${reductionsParams}) {
        data
      }
      extracts(${extractsParams}) {
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

  const { tasks, taskId } = store.workflow
  let extractorKey, reducerKey

  if (Object.keys(tasks).length > 1) {
    extractorKey = taskId
    reducerKey = taskId
  }

  useEffect(() => {
    async function loadData() {
      setLoadingState(ASYNC_STATES.LOADING)
      try {
        const newData = await fetchAggregations(subjectID, workflowID, extractorKey, reducerKey)
        setData(newData)
        setLoadingState(ASYNC_STATES.READY)
      } catch (error) {
        console.error(error)
        setError(error.message)
        setLoadingState(ASYNC_STATES.ERROR)
      }
    }

    if (subjectID && workflowID) {
      loadData(subjectID, workflowID)
    }
  }, [subjectID, workflowID, extractorKey, reducerKey])

  useEffect(() => {
    const newSnapshot = {
      current: data,
      error,
      asyncState: loadingState
    }
    applySnapshot(store.aggregations, newSnapshot)
    if (loadingState === ASYNC_STATES.READY) {
      store.aggregations.extractData()
    }
  }, [data, error, loadingState, store.aggregations])
}