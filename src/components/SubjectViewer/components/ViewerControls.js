import React from 'react'
import PropTypes from 'prop-types'
import { Button, Box } from 'grommet'

const PAN_STEP = 10
const ZOOM_STEP = 0.1

const ViewerControls = function ({
  resetView,
  setPan,
  setZoom,
}) {
  return (
    <Box>
      <Button onClick={() => { setZoom(ZOOM_STEP, true) }}>+</Button>
      <Button onClick={() => { setZoom(-ZOOM_STEP, true) }}>-</Button>
      <Button onClick={() => { resetView() }}>Reset</Button>
    </Box>
  )
}

ViewerControls.propTypes = {
  resetView: PropTypes.func,
  setPan: PropTypes.func,
  setZoom: PropTypes.func,
}

ViewerControls.defaultProps = {
  resetView: () => {},
  setPan: () => {},
  setZoom: () => {},
}

export default ViewerControls
