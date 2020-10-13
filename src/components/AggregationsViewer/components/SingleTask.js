import React from 'react'
import PropTypes from 'prop-types'
import { Box, Meter, Paragraph, Tab, Tabs, Text } from 'grommet'
import styled from 'styled-components'

import PieChart from './PieChart'

function simplifyText (text) {
  return text
    .replace(/!\[[^\]]*\]\([^\)]*\)/g, '')  // Remove Markdown images
}

const FixedWidthTextS = styled(Text)`
  width: 2.5em;
  overflow: auto;
`

const FixedWidthTextM = styled(Text)`
  width: 4em;
  overflow: auto;
`

const FixedHeightBox = styled(Box)`
  ${props => (props.expand)
    ? ''
    : 'overflow: auto; max-height: 50vh;'
  }
`

const SingleTask = function ({
  aggregationData,
  expand,
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
  
  let sanityCheck = 0
  const summarisedData = answers.map((ans, index) => {
    const count = reductionsData[index] || 0
    sanityCheck += count
    return {
      label: simplifyText(ans.label),
      count: count,
    }
  })
  
  const summary = <Paragraph>This image has been classified by <b>{numClassifications}</b> people.</Paragraph>
  const footnote = (sanityCheck !== numClassifications)
    ? <Text size='xsmall'>The number of classifications do not match the number of answers. There are many reasons for this - for example, a user might have submitted a classification with no answer.</Text>
    : null
  
  return (
    <Box>
      {summary}
      <FixedHeightBox background='#ffffff' expand={expand} pad='xsmall'>
        <Tabs>
          <Tab title='Chart'>
            <PieChart
              data={summarisedData}
              totalCount={numClassifications}
            />
          </Tab>
          <Tab title='Q&amp;A'>
            <Paragraph flex={false}>{question}</Paragraph>
            {summarisedData.map(({ label, count }, index) => (
              <Box
                flex={false}
                key={`answer-${index}`}
                margin='xsmall'
              >
                <Text size={(expand) ? 'small' : 'xsmall'}>{label}</Text>
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
                  <FixedWidthTextS flex={false}>{count}</FixedWidthTextS>
                  {(expand && numClassifications > 0) && (
                    <FixedWidthTextM flex={false}>{(count / numClassifications * 100).toFixed(1)}%</FixedWidthTextM>
                  )}
                </Box>
              </Box>
            ))}
          </Tab>
        </Tabs>
      </FixedHeightBox>
      {footnote}
    </Box>
  )
}

SingleTask.propTypes = {
  aggregationData: PropTypes.object,
  expand: PropTypes.bool,
  selectedTask: PropTypes.object,
  selectedTaskIndex: PropTypes.number,
  stats: PropTypes.object,
}

SingleTask.defaultProps = {
  aggregationData: {},
  expand: false,
  selectedTask: {},
  selectedTaskIndex: 0,
  stats: {},
}

export default SingleTask
