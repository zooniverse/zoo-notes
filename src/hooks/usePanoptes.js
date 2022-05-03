import { useContext, useEffect } from 'react'
import AppContext from 'stores'

export default function usePanoptes(subjectID, workflowID) {
  const store = useContext(AppContext)

  useEffect(() => {
    store.subject.fetchSubject(subjectID)
    store.workflow.fetchWorkflow(workflowID)

    return () => {}
  }, [workflowID, subjectID, store.workflow, store.subject])
}