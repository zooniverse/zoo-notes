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
      <>
        <Paragraph>
          This Subject has <b>{numClassifications}</b> Classification(s) consisting of <b>{numExtractPoints}</b> raw point(s) (annotations). These raw points have been reduced to <b>{numReductionPoints}</b> aggregated point(s).
        </Paragraph>
        {(numClassifications > 0 && numExtractPoints === 0 && numReductionPoints === 0) &&
          <Paragraph>
            This may indicate that, according to everyone who has seen this Subject, there's nothing on this specific image that's relevant to the Workflow's question. 
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