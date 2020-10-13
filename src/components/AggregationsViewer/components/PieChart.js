import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

let cursorPos = { x: 0, y: 0 }

const SVG = styled.svg`
  max-height: 50vh;
`

const R = 100

const PieChart = function ({
  colours,
  data,
  totalCount,
}) {
  if (totalCount <= 0 || !data || data.length === 0) return null
  
  let totalAngle = 0
  
  return (
    <SVG viewBox={`${R*-1.2} ${R*-1.2} ${R*2.4} ${R*2.4}`}>
      <circle r={R} cx='0' cy='0' fill='#fff' stroke='#eee' strokeWidth='4' />
      <g>
        {data.map((dataItem, index) => {
          
          const angle = dataItem.count / totalCount * 2 * Math.PI
          const startAngle = totalAngle
          const endAngle = startAngle + angle
          const largeArcFlag = (angle > Math.PI) ? 1 : 0
          const sweepFlag = 1  // Clockwise sweep!
          
          totalAngle += angle

          if (dataItem.count <= 0) return null
          
          return (
            <path
              key={`pie-slice-${index}`}
              d={`M 0 0 L ${Math.cos(startAngle)*R} ${Math.sin(startAngle)*R} A ${R} ${R} 0 ${largeArcFlag} ${sweepFlag} ${Math.cos(endAngle)*R} ${Math.sin(endAngle)*R} Z`}
              fill={(colours && colours[index]) || '#666666'}
              stroke='#ffffff'
            />
          )
        })}
      </g>
    </SVG>
  )
}

PieChart.propTypes = {
  colours: PropTypes.arrayOf(PropTypes.string),
  data: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    count: PropTypes.number,
  })),
  totalCount: PropTypes.number,
}

PieChart.defaultProps = {
  colours: [],
  data: [],
  totalCount: 0,
}

export default PieChart
