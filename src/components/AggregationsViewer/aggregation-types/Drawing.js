import React from 'react'
import PropTypes from 'prop-types'
import { Box, Paragraph } from 'grommet'
import styled from 'styled-components'

const Drawing = function ({
  selectedTask,
  selectedTaskType,
  stats,
  workflowTasks,
}) {
  if (!stats) return null
  const { numClassifications, numExtractPoints, numReductionPoints } = stats
  
  let summary = <Paragraph>Unfortunately, we have no additional information about this Subject.</Paragraph>
  
  if (numClassifications >= 0 && numExtractPoints >= 0 && numReductionPoints >= 0) {
    summary = (
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
  }

  return (
    <Box>
      {summary}
    </Box>
  )
}

Drawing.propTypes = {
  selectedTask: PropTypes.object,
  stats: PropTypes.object,
}

Drawing.defaultProps = {
  selectedTask: {},
  stats: {},
}

export default Drawing
