import { useContext, useEffect } from 'react'
import { panoptes } from '@zooniverse/panoptes-js'
import { applySnapshot } from 'mobx-state-tree'
import AppContext from 'stores'
import useSWR from 'swr'

import ASYNC_STATES from 'helpers/asyncStates'

async function fetchWorkflow(id) {
  const { body } = await panoptes.get(`/workflows/${id}`)
  const [workflow] = body.workflows
  return workflow
}

export default function useWorkflow(id) {
  const store = useContext(AppContext)
  let loadingState = ASYNC_STATES.LOADING
  const { data, error } = useSWR(id, fetchWorkflow)
  if (error) {
    loadingState = ASYNC_STATES.ERROR
  }
  if (data) {
    loadingState = ASYNC_STATES.READY
  }


  useEffect(() => {
    const taskId = data?.first_task || store.workflow.taskId
    const current = data || store.workflow.current
    const newSnapshot = {
      current,
      asyncState: loadingState,
      taskId
    }
    applySnapshot(store.workflow, newSnapshot)
  }, [data, loadingState, store.workflow])

  return store.workflow.current
}