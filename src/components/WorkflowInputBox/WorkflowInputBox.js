import { useRef } from 'react'
import { Box, Button, TextInput } from 'grommet'
import { FormNext as NextIcon } from 'grommet-icons'
import { useNavigate } from 'react-router-dom'

const WorkflowInputBox = function () {
  const workflowInput = useRef(null)
  const navigate = useNavigate()
  
  function goToWorkflow () {
    let value = (workflowInput.current && workflowInput.current.value) || ''
    value = value.replace(/\D/g, '')
    if (value.length > 0) navigate(`/view/workflow/${value}`)
  }
  
  return (
    <Box
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
    </Box>
    
  )
}

WorkflowInputBox.propTypes = {}

WorkflowInputBox.defaultProps = {}

export default WorkflowInputBox
