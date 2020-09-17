import React from 'react'
import PropTypes from 'prop-types'

const DEFAULT_SIZE = 8
const STROKE_WIDTH_RATIO = 0.5

const AggregationsPane = function ({
  fill,
  offsetX,
  offsetY,
  points,
  stroke,
  zoom,
}) {
  const pointSize = DEFAULT_SIZE / zoom
  
  return (
    <g transform={`translate(${offsetX}, ${offsetY})`}>
      {points.map((point, index) => {
        return (
          <circle
            key={`aggregation-point-${index}`}
            cx={point.x}
            cy={point.y}
            r={pointSize}
            fill={fill}
            stroke={stroke}
            strokeWidth={pointSize * STROKE_WIDTH_RATIO}
          />
        )
      })}
    </g>
  )
}

AggregationsPane.propTypes = {
  fill: PropTypes.string,
  offsetX: PropTypes.number,
  offsetY: PropTypes.number,
  points: PropTypes.arrayOf(PropTypes.object),
  stroke: PropTypes.string,
  zoom: PropTypes.number,
}

AggregationsPane.defaultProps = {
  fill: '#00979d',
  offsetX: 0,
  offsetY: 0,
  points: [],
  stroke: '#ffffff',
  zoom: 1,
}

export default AggregationsPane
