import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

let cursorPos = { x: 0, y: 0 }

const SVG = styled.svg`
  max-height: 50vh;
`

const PieChart = function ({
  data,
  maxCount,
}) {
  if (maxCount <= 0 || !data || data.length === 0) return null
  
  return (
    <SVG viewBox='-120 -120 240 240'>
      <circle r='100' cx='0' cy='0' fill='#666666' />
      <path d={`M 0 0 L 100 0 A 100 100 0 0 1 0 100 Z`} fill='#cc4444' />
    </SVG>
  )
}

PieChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    count: PropTypes.number,
  })),
  maxCount: PropTypes.number,
}

PieChart.defaultProps = {
  data: [],
  maxCount: 0,
}

export default PieChart
