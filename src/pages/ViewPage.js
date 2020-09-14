import React from 'react'
import { Box } from 'grommet'
import { observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import AppContext from 'stores'
import ASYNC_STATES from 'helpers/asyncStates'

import SubjectViewer from 'components/SubjectViewer'

function ViewPage ({ match }) {
  const store = React.useContext(AppContext)
  const workflowId = match.params.workflowId
  const subjectId = match.params.subjectId
  
  
  React.useEffect(() => {
    store.workflow.fetchWorkflow(workflowId)
    store.subject.fetchSubject(subjectId)
    
    return () => {}
  }, [workflowId, subjectId])
  
  return (
    <Box>
      <h1>Viewing</h1>
      <h6>Workflow: {workflowId} - {store.workflow.asyncState} {store.workflow.current && store.workflow.current.display_name}</h6>
      <h6>Subject: {subjectId} - {store.subject.asyncState}</h6>
      
      <SubjectViewer />
      
    </Box>
  )
}

export { ViewPage }
export default withRouter(observer(ViewPage))
