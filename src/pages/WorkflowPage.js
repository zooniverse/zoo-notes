import { useContext, useEffect } from 'react'
import { Box, Heading, Paragraph, Text } from 'grommet'
import { observer } from 'mobx-react'
import { useParams } from 'react-router'
import styled from 'styled-components'
import AppContext from 'stores'

import WorkflowObserver from 'components/WorkflowObserver'
import WorkflowInputBox from 'components/WorkflowInputBox'

const ConstrainedParagraph = styled(Paragraph)`
  max-width: 40rem;
`

const ConstrainedBox = styled(Box)`
  max-width: 40rem;
`

function WorkflowPage () {
  const store = useContext(AppContext)
  const { workflowId } = useParams()
  
  useEffect(() => {
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
          <ConstrainedParagraph>
            This page is now observing workflow {workflowId}, showing recent Classifications for that project. Leave this web page open while you work on the project on another web browser tab/window.
          </ConstrainedParagraph>
        </>
      }

      {!workflowId &&
        <Box>
          <ConstrainedParagraph>
            This page is showing every classifications from every workflow on the Zooniverse. You can view a specific workflow by entering its ID below:
          </ConstrainedParagraph>
          <ConstrainedBox>
            <WorkflowInputBox />
          </ConstrainedBox>
        </Box>
      }
      
      <WorkflowObserver
        workflowId={workflowId}
      />
      
    </Box>
  )
}

export { WorkflowPage }
export default observer(WorkflowPage)
