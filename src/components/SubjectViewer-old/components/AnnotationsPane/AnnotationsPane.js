import React from 'react'
import { array, bool, func, number } from 'prop-types'
import { observer } from 'mobx-react'

function AnnotationsPane({
  x,
  y
}) {
  const offset = `translate(${x}, ${y})`

  return (
    <g transform={offset}>
    </g>
  )
}

AnnotationsPane.propTypes = {
  x: number,
  y: number
}

AnnotationsPane.defaultProps = {
  x: 0,
  y: 0
}

export default observer(AnnotationsPane)
