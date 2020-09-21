import React from 'react'
import { Box, Button, Heading, Paragraph, Text, TextInput } from 'grommet'
import { FormNext as NextIcon } from 'grommet-icons'
import styled from 'styled-components'
import { observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import AppContext from 'stores'

import WorkflowObserver from 'components/WorkflowObserver'

const ConstrainedParagraph = styled(Paragraph)`
  max-width: 40rem;
`

const ConstrainedBox = styled(Box)`
  max-width: 40rem;
`

function WorkflowPage ({ match }) {
  const store = React.useContext(AppContext)
  const workflowId = match.params.workflowId
  const workflowInput = React.useRef(null)
  
  React.useEffect(() => {
    store.workflow.fetchWorkflow(workflowId)
    
    return () => {}
  }, [workflowId, store.workflow])
  
  function goToWorkflow () {
    let value = workflowInput.current && workflowInput.current.value || ''
    value = value.replace(/\D/g, '')
    if (value.length > 0) window.location = `/view/workflow/${value}`
  }
  
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
          <ConstrainedBox
            align='stretch'
            direction='row'
            gap='xsmall'
          >
            <TextInput
              pad='xsmall'
              placeholder="Workflow ID, e.g. '1234'"
              ref={workflowInput}
              size='small'
            />
            <Button
              gap='xsmall'
              icon={<NextIcon size='small' />}
              label='Go'
              onClick={goToWorkflow}
              reverse={true}
              size='small'
            />
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
export default withRouter(observer(WorkflowPage))
