import { useContext, useEffect } from 'react'
import { subjects } from '@zooniverse/panoptes-js'
import { applySnapshot } from 'mobx-state-tree'
import AppContext from 'stores'
import useSWR from 'swr'

import ASYNC_STATES from 'helpers/asyncStates'

async function fetchSubject(id) {
  const { body } = await subjects.get({ id })
  const [subject] = body.subjects
  return subject
}

export default function useSubject(id) {
  const store = useContext(AppContext)
  let loadingState = ASYNC_STATES.LOADING
  const { data, error } = useSWR(id, fetchSubject)
  if (error) {
    loadingState = ASYNC_STATES.ERROR
  }
  if (data) {
    loadingState = ASYNC_STATES.READY
  }


  useEffect(() => {
    const page = store.subject.page ?? 0
    const current = data || store.subject.current
    const newSnapshot = {
      current,
      asyncState: loadingState,
      page
    }
    applySnapshot(store.subject, newSnapshot)
  }, [data, loadingState, store.subject])

  return store.subject.current
}