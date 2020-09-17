import React from 'react'
import { Box, Heading, Text } from 'grommet'
import { observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import AppContext from 'stores'

import WorkflowObserver from 'components/WorkflowObserver'

function WorkflowPage ({ match }) {
  const store = React.useContext(AppContext)
  const workflowId = match.params.workflowId
  
  React.useEffect(() => {
    store.workflow.fetchWorkflow(workflowId)
    
    return () => {}
  }, [workflowId, store.workflow])
  
  return (
    <Box>
      <Heading as="h2" size="xsmall">Preparing Workflow</Heading>
      <Text>
        Workflow: {workflowId} ({store.workflow.asyncState}) {store.workflow.current && store.workflow.current.display_name}
      </Text>
      
      <WorkflowObserver
        workflowId={workflowId}
      />
      
    </Box>
  )
}

export { WorkflowPage }
export default withRouter(observer(WorkflowPage))
