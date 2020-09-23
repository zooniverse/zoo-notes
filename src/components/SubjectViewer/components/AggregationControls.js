import React from 'react'
import PropTypes from 'prop-types'
import { Box, Paragraph } from 'grommet'
import styled from 'styled-components'

const CompactBox = styled(Box)`
  max-width: 12em;
`

const AggregationControls = function ({
  stats,
  workflowTasks,
}) {
  if (!stats) return null
  const { numClassifications, numExtractPoints, numReductionPoints } = stats
  
  let summary = null
  if (numClassifications >= 0 && numExtractPoints >= 0 && numReductionPoints >= 0) {
    summary = (
      <Paragraph>
        This Subject has <b>{numClassifications}</b> Classifications consisting of <b>{numExtractPoints}</b> raw points (annotations). These raw points have been reduced to <b>{numReductionPoints}</b> aggregated points.
      </Paragraph>
    )
  } else {
    summary = (
      <Paragraph>Unfortunately, we have no additional information about this Subject.</Paragraph>
    )
  }

  return (
    <CompactBox margin={{ horizontal: 'small', vertical: 'none' }} background='#ffffff' pad='xsmall'>
      {summary}
    </CompactBox>
  )
}

AggregationControls.propTypes = {
  stats: PropTypes.object,
  workflowTasks: PropTypes.object,
}

AggregationControls.defaultProps = {
  stats: {},
  workflowTasks: {},
}

export default AggregationControls
