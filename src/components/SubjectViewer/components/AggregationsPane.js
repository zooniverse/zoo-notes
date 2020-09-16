import React from 'react'
import PropTypes from 'prop-types'

const DEFAULT_SIZE = 8
const STROKE_WIDTH_RATIO = 0.5

const AggregationsPane = function ({
  data,
  offsetX,
  offsetY,
  zoom,
}) {
  const pointSize = 4 / zoom
  
  return (
    <g transform={`translate(${offsetX}, ${offsetY})`}>
      {data.map((point, index) => {
        return (
          <circle
            key={`aggregation-point-${index}`}
            cx={point.x}
            cy={point.y}
            r={pointSize}
            fill="#00979d"
            stroke="#ffffff"
            strokeWidth={pointSize * STROKE_WIDTH_RATIO}
          />
        )
      })}
    </g>
  )
}

AggregationsPane.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  offsetX: PropTypes.number,
  offsetY: PropTypes.number,
  zoom: PropTypes.number,
}

AggregationsPane.defaultProps = {
  data: [],
  offsetX: 0,
  offsetY: 0,
  zoom: 1,
}

export default AggregationsPane
