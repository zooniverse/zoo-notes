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
  imageWidth,
  imageHeight,
  panX,
  panY,
  zoom,
  setPan,
  setZoom,
}, containerRef) {
  if (!imageUrl || imageUrl.length === 0 || !containerRef) return null

  const interactionRef = React.useRef(null)
  const [isMoving, setIsMoving] = React.useState(false)

  // Fit to parent container
  const boundingBox = containerRef.current && containerRef.current.getBoundingClientRect()
  const viewerWidth = (boundingBox && boundingBox.width) || 0
  const viewerHeight = (boundingBox && boundingBox.height) || 0
  const viewBox = `${-viewerWidth/2} ${-viewerHeight/2} ${viewerWidth || 0} ${viewerHeight || 0}`
  
  const transform = `scale(${zoom}) translate(${panX}, ${panY})`

  const onMouseDown = (e) => {
    e.preventDefault()
    cursorPos = { x: e.clientX, y: e.clientY }
    setIsMoving(true)
  }
  
  const onMouseMove = (e) => {
    e.preventDefault()
    if (!isMoving) return

    const difference = {
      x: (e.clientX - cursorPos.x) / zoom,
      y: (e.clientY - cursorPos.y) / zoom,
    }
    cursorPos = { x: e.clientX, y: e.clientY }
    setPan(difference, true)
  }
  
  const onMouseUpOrLeave = (e) => {
    e.preventDefault()
    setIsMoving(false)
  }
  
  const onWheel = (e) => {
    e.preventDefault()
    const WHEEL_STEP = 0.1
    
    if (e.deltaY < 0) {
      setZoom(WHEEL_STEP, true)
    } else if (e.deltaY > 0) {
      setZoom(-WHEEL_STEP, true)
    }
  }
  
  React.useEffect(() => {
    interactionRef.current && interactionRef.current.addEventListener('wheel', onWheel, { passive: false })
    
    return () => {
      interactionRef.current && interactionRef.current.removeEventListener('wheel', onWheel)
    }
  })

  return (
    <SVG
      onMouseDown={onMouseDown}
      onMouseLeave={onMouseUpOrLeave}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUpOrLeave}
      viewBox={viewBox}
      ref={interactionRef}
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

SubjectViewer.propTypes = {
  imageUrl: PropTypes.string,
  imageWidth: PropTypes.number,
  imageHeight: PropTypes.number,
  panX: PropTypes.number,
  panY: PropTypes.number,
  zoom: PropTypes.number,
  setPan: PropTypes.func,
  setZoom: PropTypes.func,
}

SubjectViewer.defaultProps = {
  imageUrl: undefined,
  imageWidth: 1,
  imageHeight: 1,
  panX: 0,
  panY: 0,
  zoom: 1,
  setPan: () => {},
  setZoom: () => {},
}

export default SubjectViewer
