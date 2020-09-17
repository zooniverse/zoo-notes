import React from 'react'
import { Box, Heading, Paragraph, Text } from 'grommet'
import styled from 'styled-components'
import { observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import AppContext from 'stores'

import WorkflowObserver from 'components/WorkflowObserver'

const StyledParagraph = styled(Paragraph)`
  max-width: 40rem;
`

function WorkflowPage ({ match }) {
  const store = React.useContext(AppContext)
  const workflowId = match.params.workflowId
  
  React.useEffect(() => {
    store.workflow.fetchWorkflow(workflowId)
    
    return () => {}
  }, [workflowId, store.workflow])
  
  return (
    <Box>
      <Heading as="h2" size="xsmall">Observing Classifications</Heading>
      {workflowId &&
        <>
          <Text>
            Workflow: {workflowId} ({store.workflow.asyncState}) {store.workflow.current && store.workflow.current.display_name}
          </Text>
          <StyledParagraph>
            This page is now observing workflow {workflowId}, showing recent Classifications for that project. Leave this web page open while you work on the project on another web browser tab/window.
          </StyledParagraph>
        </>
      }
      
      <WorkflowObserver
        workflowId={workflowId}
      />
      
    </Box>
  )
}

export { WorkflowPage }
export default withRouter(observer(WorkflowPage))
