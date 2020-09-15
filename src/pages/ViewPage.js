import React from 'react'
import { Box, Heading, Text } from 'grommet'
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
    store.aggregations.fetchAggregations(workflowId, subjectId)
    
    return () => {}
  }, [workflowId, subjectId, store.workflow, store.subject])
  
  return (
    <Box>
      <Heading as="h2" size="xsmall">Viewing Subject</Heading>
      <Text>
        Subject: {subjectId} ({store.subject.asyncState})
        &nbsp;|&nbsp;
        Workflow: {workflowId} ({store.workflow.asyncState}) {store.workflow.current && store.workflow.current.display_name}
      </Text>
      <SubjectViewer />
    </Box>
  )
}

export { ViewPage }
export default withRouter(observer(ViewPage))
