import React from 'react'
import PropTypes from 'prop-types'
import { Box, Select, Text } from 'grommet'
import styled from 'styled-components'

const WorkflowControls = function ({
  setTaskId,
  taskId,
  workflowAsyncState,
  workflowError,
  workflowDisplayName,
  workflowId,
  workflowTasks,
}) {
  const taskOptions = Object.keys(workflowTasks).map(key => {
    const task = workflowTasks[key]
    return {
      label: `Task ${key}: ${task.instruction}`,
      value: key,
    }
  })
  const taskValue = taskOptions.find(task => task.value === taskId)
  
  return (
    <Box
      align='center'
      direction='row'
      gap='xsmall'
      wrap={true}
    >
      <Text>
        Workflow: {workflowId} ({workflowAsyncState}) {workflowDisplayName}
      </Text>
      <Select
        labelKey='label'
        options={taskOptions}
        onChange={({ option }) => { setTaskId(option.value) }}
        size='small'
        value={taskValue}
        valueKey='value'
      />
    </Box>
  )
}

WorkflowControls.propTypes = {
  setTaskId: PropTypes.func,
  taskId: PropTypes.string,
  workflowAsyncState: PropTypes.string,
  workflowError: PropTypes.string,
  workflowDisplayName: PropTypes.string,
  workflowId: PropTypes.string,
  workflowTasks: PropTypes.object,
}

WorkflowControls.defaultProps = {
  setTaskId: () => {},
  taskId: '',
  workflowAsyncState: '',
  workflowError: '',
  workflowDisplayName: '',
  workflowId: '',
  workflowTasks: {},
}

export default WorkflowControls
