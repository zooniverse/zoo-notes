import React from 'react'
import PropTypes from 'prop-types'
import { Box, Paragraph } from 'grommet'
import styled from 'styled-components'

const AggregationControls = function ({
  stats,
}) {
  if (!stats) return null
  const { numClassifications, numExtractPoints, numReductionPoints } = stats
  
  const ExtractsIcon = <Box round='small' background='accent-3' border={{ color: '#ffffff', size: 'small' }} pad='xxsmall' />
  const ReductionsIcon = <Box round='small' background='accent-4' border={{ color: '#ffffff', size: 'small' }} pad='xxsmall' />
  
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
    <Box>
      {summary}
    </Box>
  )
}

AggregationControls.propTypes = {
  stats: PropTypes.object,
}

AggregationControls.defaultProps = {
  stats: {},
}

export default AggregationControls
