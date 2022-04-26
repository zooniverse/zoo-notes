import PropTypes from 'prop-types'

const STROKE_WIDTH_RATIO = 0.1

const AggregationsPane = function ({
  fill,
  offsetX,
  offsetY,
  points,
  pointSize,
  stroke,
  zoom,
}) {
  const scaledSize = pointSize / zoom
  
  return (
    <g transform={`translate(${offsetX}, ${offsetY})`}>
      {points.map((point, index) => {
        return (
          <circle
            key={`aggregation-point-${index}`}
            cx={point.x}
            cy={point.y}
            r={scaledSize / 2}
            fill={fill}
            stroke={stroke}
            strokeWidth={scaledSize * STROKE_WIDTH_RATIO}
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
  pointSize: PropTypes.number,
  stroke: PropTypes.string,
  zoom: PropTypes.number,
}

AggregationsPane.defaultProps = {
  fill: '#00979d',
  offsetX: 0,
  offsetY: 0,
  points: [],
  pointSize: 16,
  stroke: '#ffffff',
  zoom: 1,
}

export default AggregationsPane
