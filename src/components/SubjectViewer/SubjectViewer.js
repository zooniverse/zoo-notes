import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

let cursorPos = { x: 0, y: 0 }

const SVG = styled.svg`
  height: 100%;
  width: 100%;

  :hover {
    cursor: move;
  }
`

const SubjectViewer = function ({}) {
  if (url.length === 0 || disabled || !ref) return null;

  const [isMoving, setMove] = React.useState(false)

  const boundingBox = ref.current && ref.current.getBoundingClientRect()
  const viewerWidth = (boundingBox && boundingBox.width) || 0
  const viewerHeight = (boundingBox && boundingBox.height) || 0
  const viewBox = `${-viewerWidth/2} ${-viewerHeight/2} ${viewerWidth || 0} ${viewerHeight || 0}`

  const onMouseDown = e => {
    e.preventDefault()
    cursorPos = { x: e.clientX, y: e.clientY }
    setMove(true)
  }
  const onMouseMove = e => {
    e.preventDefault()
    if (!isMoving) return

    const difference = {
      x: (e.clientX - cursorPos.x) / image.scale,
      y: (e.clientY - cursorPos.y) / image.scale
    }
    cursorPos = { x: e.clientX, y: e.clientY }
    image.setTranslate(difference)
  }

  return (
    <SVG
      onMouseDown={onMouseDown}
      onMouseLeave={(e) => {
        e.preventDefault()
        setMove(false)
      }}
      onMouseMove={onMouseMove}
      onMouseUp={(e) => {
        e.preventDefault()
        setMove(false)
      }}
      viewBox={viewBox}
    >
      <g transform={transform}>
        <image
          height={height}
          width={width}
          xlinkHref={url}
          x={width * -0.5}
          y={height * -0.5}
        />
      </g>
    </SVG>
  )
}

SubjectViewer.propTypes = {}

SubjectViewer.defaultProps = {}

export default SubjectViewer
