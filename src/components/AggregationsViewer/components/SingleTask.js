import React from 'react'
import PropTypes from 'prop-types'
import { Box, Paragraph, Text } from 'grommet'
import styled from 'styled-components'

const SingleTask = function ({
  aggregationData,
  selectedTask,
  selectedTaskIndex,
  stats,
}) {
  if (!stats) return null
  const { question, answers } = selectedTask
  const { numClassifications } = stats
  const { reductions } = aggregationData
  
  const reductionsData = reductions && reductions [selectedTaskIndex]?.data
  
  if (!selectedTask || !answers || !reductions || !reductionsData) {
    return (
      <Box>
        <Paragraph>Unfortunately, we have no additional information about this Subject.</Paragraph>
      </Box>
    )
  }
  
  const summary = <Paragraph>This image has been classified by <b>{numClassifications}</b> people.</Paragraph>
    
  console.log('+++ selectedTask: ', selectedTask)
  console.log('+++ reductionsData: ', reductionsData)

  return (
    <Box>
      {summary}
      <Box background='#ffffff' pad='xsmall'>
        <Text>{question}</Text>
  
        
      </Box>
    </Box>
  )
}

SingleTask.propTypes = {
  aggregationData: PropTypes.object,
  selectedTask: PropTypes.object,
  selectedTaskIndex: PropTypes.number,
  stats: PropTypes.object,
}

SingleTask.defaultProps = {
  aggregationData: {},
  selectedTask: {},
  selectedTaskIndex: 0,
  stats: {},
}

export default SingleTask
