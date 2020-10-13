import React from 'react'
import { Box, Heading, Text } from 'grommet'
import { observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import AppContext from 'stores'

import AggregationsViewer from 'components/AggregationsViewer'
import SubjectViewer from 'components/SubjectViewer'

function SubjectPage ({ match }) {
  const store = React.useContext(AppContext)
  const workflowId = match.params.workflowId
  const subjectId = match.params.subjectId
  
  React.useEffect(() => {
    // Fetch Subject!
    store.subject.fetchSubject(subjectId)
    
    // Fetch Workflow, and Aggregations!
    // Please do this in order because aggregations don't make sense without a workflow.
    store.workflow.fetchWorkflow(workflowId).then(() => {
      store.aggregations.fetchAggregations(workflowId, subjectId)
    })
    
    return () => {}
  }, [workflowId, subjectId, store.workflow, store.subject, store.aggregations])
  
  return (
    <Box>
      <Heading as='h2' size='xsmall'>Viewing Subject</Heading>
      <Text>
        Subject: {subjectId} ({store.subject.asyncState})
        &nbsp;|&nbsp;
        Workflow: {workflowId} ({store.workflow.asyncState}) {store.workflow.current && store.workflow.current.display_name}
      </Text>
      <Box direction='row' gap='xsmall'>
        <SubjectViewer />
        <AggregationsViewer />
      </Box>
    </Box>
  )
}

export { SubjectPage }
export default withRouter(observer(SubjectPage))
