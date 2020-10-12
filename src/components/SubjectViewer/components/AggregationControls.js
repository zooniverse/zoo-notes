import React from 'react'
import PropTypes from 'prop-types'
import { Box, Paragraph } from 'grommet'
import styled from 'styled-components'

const CompactBox = styled(Box)`
  max-width: 12em;
`

const AggregationControls = function ({
  selectedTask,
  selectedTaskType,
  stats,
  workflowTasks,
}) {
  if (!stats) return null
  const { numClassifications, numExtractPoints, numReductionPoints } = stats
  
  let summaryA = null
  
  if (selectedTaskType === 'drawing') {
    summaryA = <Paragraph>We are currently examining the results for a Drawing-type task.</Paragraph>
  } else {
    summaryA = <Paragraph>This is an unfamiliar '{selectedTaskType}' type task.</Paragraph>
  }
  
  let summaryB = null
  if (numClassifications >= 0 && numExtractPoints >= 0 && numReductionPoints >= 0) {
    summaryB = (
      <>
        <Paragraph>
          This image has been classified by <b>{numClassifications}</b> people who have made <b>{numExtractPoints}</b> markings. These raw markings have been combined to make <b>{numReductionPoints}</b> averaged point(s).
        </Paragraph>
        {(numClassifications > 0 && numExtractPoints === 0 && numReductionPoints === 0) &&
          <Paragraph>
            This may indicate that, according to everyone who has seen this Subject, there's nothing relevant on this image that needs to be marked.
          </Paragraph>
        }
        {(numClassifications > 0 && numExtractPoints > 0 && numReductionPoints === 0) &&
          <Paragraph>
            This may indicate that there isn't enough agreement to create a consensus.
          </Paragraph>
        }
        {(numClassifications === 0) &&
          <Paragraph>
            This means nobody has classified this Subject yet.
          </Paragraph>
        }
      </>
    )
  } else {
    summaryB = (
      <Paragraph>Unfortunately, we have no additional information about this Subject.</Paragraph>
    )
  }

  return (
    <CompactBox margin={{ horizontal: 'small', vertical: 'none' }} background='#ffffff' pad='xsmall'>
      {summaryA}
      {summaryB}
    </CompactBox>
  )
}

AggregationControls.propTypes = {
  selectedTask: PropTypes.object,
  selectedTaskType: PropTypes.string,
  stats: PropTypes.object,
  workflowTasks: PropTypes.object,
}

AggregationControls.defaultProps = {
  selectedTask: {},
  selectedTaskType: '',
  stats: {},
  workflowTasks: {},
}

export default AggregationControls
