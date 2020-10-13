import React from 'react'
import PropTypes from 'prop-types'
import { Box, Meter, Paragraph, Text } from 'grommet'
import styled from 'styled-components'

function simplifyText (text) {
  return text
    .replace(/!\[[^\]]*\]\([^\)]*\)/g, '')  // Remove Markdown images
}

const FixedWidthText = styled(Text)`
  width: 5em;
  overflow: auto;
`

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
  
  const maxCount = Object.values(reductionsData).reduce((max, cur) => Math.max(max, cur))
  const summary = <Paragraph>This image has been classified by <b>{numClassifications}</b> people.</Paragraph>
    
  console.log('+++ selectedTask: ', selectedTask)
  console.log('+++ reductionsData: ', reductionsData)
  console.log('+++ maxCount: ', maxCount)

  return (
    <Box>
      {summary}
      <Box background='#ffffff' pad='xsmall'>
        <Paragraph>{question}</Paragraph>
        {answers.map((ans, index) => {
          const label = simplifyText(ans.label)
          const count = reductionsData[index] || 0
  
          return (
            <Box
              key={`answer-${index}`}
              margin='xsmall'
            >
              <Text size='xsmall'>{label}</Text>
              <Box
                align='center'
                direction='row'
                gap='small'
              >
                <Meter
                  flex='grow'
                  max={maxCount}
                  values={[{ value: count, color: 'accent-4' }]}
                />
                <FixedWidthText flex={false}>{count}</FixedWidthText>
              </Box>
            </Box>
          )
        })}
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
