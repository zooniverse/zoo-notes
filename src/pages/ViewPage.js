import React from 'react'
import { Box } from 'grommet'
import { observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import AppContext from 'stores'

import SubjectViewer from 'components/SubjectViewer'

function ViewPage ({ match }) {
  const store = React.useContext(AppContext)
  const workflowId = match.params.workflowId
  const subjectId = match.params.subjectId
  
  React.useEffect(() => {
    store.workflow.fetchWorkflow(workflowId)
    store.subject.fetchSubject(subjectId)
    
    return () => {}
  }, [workflowId, subjectId, store.workflow, store.subject])
  
  return (
    <Box>
      <h1>Viewing</h1>
      <p>Workflow: {workflowId} - {store.workflow.asyncState} {store.workflow.current && store.workflow.current.display_name}</p>
      <p>Subject: {subjectId} - {store.subject.asyncState}</p>
      
      <SubjectViewer />
      
    </Box>
  )
}

export { ViewPage }
export default withRouter(observer(ViewPage))
