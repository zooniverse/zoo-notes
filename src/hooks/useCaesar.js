import { useContext, useEffect } from 'react'
import { request, gql } from 'graphql-request'
import { applySnapshot, getSnapshot } from 'mobx-state-tree'
import useSWR from 'swr'
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
  let loadingState = ASYNC_STATES.LOADING

  const { tasks, taskId } = store.workflow
  let extractorKey, reducerKey

  if (Object.keys(tasks).length > 1) {
    extractorKey = taskId
    reducerKey = taskId
  }

  const dataArgs = [subjectID, workflowID, extractorKey, reducerKey]
  const dataReady = subjectID && taskId
  const { data, error } = useSWR( dataReady ? dataArgs : null, fetchAggregations)
  if (error) {
    loadingState = ASYNC_STATES.ERROR
  }
  if (data) {
    loadingState = ASYNC_STATES.READY
  }

  useEffect(() => {
    const snapshot = getSnapshot(store.aggregations)
    const current = data || store.aggregations.current
    const newSnapshot = {
      ...snapshot,
      current,
      error: (typeof error === 'object') ? error?.message || '' : error,
      asyncState: loadingState
    }
    applySnapshot(store.aggregations, newSnapshot)
  }, [data, error, loadingState, store.aggregations])
}
