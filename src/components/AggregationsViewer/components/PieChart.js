import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

let cursorPos = { x: 0, y: 0 }

const SVG = styled.svg`
  max-height: 50vh;
`

const R = 100

const PieChart = function ({
  data,
  totalCount,
}) {
  if (totalCount <= 0 || !data || data.length === 0) return null
  
  const percent = data[0]
  
  return (
    <SVG viewBox={`${R*-1.2} ${R*-1.2} ${R*2.4} ${R*2.4}`}>
      <circle r={R} cx='0' cy='0' fill='#666666' />
      <path d={`M 0 0 L 100 0 A 100 100 0 0 1 0 100 Z`} fill='#cc4444' />
    </SVG>
  )
}

PieChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    count: PropTypes.number,
  })),
  totalCount: PropTypes.number,
}

PieChart.defaultProps = {
  data: [],
  totalCount: 0,
}

export default PieChart
