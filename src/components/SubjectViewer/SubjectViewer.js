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

function findCurrentSrc(locations, index) {
  if (!locations || locations.length === 0) return '';
  const location = locations[index]
  return Object.values(location)[0]
}

const SubjectViewer = React.forwardRef(function ({
  imageUrl,
  imageWidth = 100,
  imageHeight = 100,
  panX = 0,
  panY = 0,
  zoom = 1,
  setPan = () => {},
  setZoom = () => {},
}, ref) {
  if (!imageUrl || imageUrl.length === 0 || !ref) return null

  const [isMoving, setIsMoving] = React.useState(false)

  const boundingBox = ref.current && ref.current.getBoundingClientRect()
  const viewerWidth = (boundingBox && boundingBox.width) || 0
  const viewerHeight = (boundingBox && boundingBox.height) || 0
  const viewBox = `${-viewerWidth/2} ${-viewerHeight/2} ${viewerWidth || 0} ${viewerHeight || 0}`
  
  const transform = `scale(${zoom}) translate(${panX}, ${panY})`

  const onMouseDown = e => {
    e.preventDefault()
    cursorPos = { x: e.clientX, y: e.clientY }
    setIsMoving(true)
  }
  const onMouseMove = e => {
    e.preventDefault()
    if (!isMoving) return

    const difference = {
      x: (e.clientX - cursorPos.x) / zoom,
      y: (e.clientY - cursorPos.y) / zoom,
    }
    cursorPos = { x: e.clientX, y: e.clientY }
    setPan(difference)
  }

  return (
    <SVG
      onMouseDown={onMouseDown}
      onMouseLeave={(e) => {
        e.preventDefault()
        setIsMoving(false)
      }}
      onMouseMove={onMouseMove}
      onMouseUp={(e) => {
        e.preventDefault()
        setIsMoving(false)
      }}
      viewBox={viewBox}
    >
      <g transform={transform}>
        <image
          height={imageHeight}
          width={imageWidth}
          xlinkHref={imageUrl}
          x={imageWidth * -0.5}
          y={imageHeight * -0.5}
        />
      </g>
    </SVG>
  )
})

SubjectViewer.propTypes = {}

SubjectViewer.defaultProps = {}

export default SubjectViewer
