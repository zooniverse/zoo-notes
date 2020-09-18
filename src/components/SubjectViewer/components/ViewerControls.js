import React from 'react'
import PropTypes from 'prop-types'
import { Button, Box } from 'grommet'
import {
  EmptyCircle, FormDown, FormNext, FormPrevious, FormUp, ZoomIn, ZoomOut,
} from 'grommet-icons'
import styled from 'styled-components'

const PAN_STEP = 10
const ZOOM_STEP = 0.1

const CompactButton = styled(Button)`
  padding: 10px
`

const ViewerControls = function ({
  resetView,
  setPan,
  setZoom,
}) {
  return (
    <Box
      align='center'
      direction='row'
      wrap={true}
    >
      <CompactButton
        icon={<ZoomIn size='small' />}
        onClick={() => { setZoom(ZOOM_STEP, true) }}
        size='large'
      />
      <CompactButton
        icon={<ZoomOut size='small' />}
        onClick={() => { setZoom(-ZOOM_STEP, true) }}
      />
      <CompactButton
        icon={<EmptyCircle size='small' />}
        onClick={() => { resetView() }}
      />
      <Box
        align='center'
        direction='row'
      >
        <CompactButton
          icon={<FormPrevious size='small' />}
          onClick={() => { setPan({ x: -PAN_STEP, y: 0 }, true) }}
        />
        <Box>
          <CompactButton
            icon={<FormUp size='small' />}
            onClick={() => { setPan({ x: 0, y: -PAN_STEP }, true) }}
          />
          <CompactButton
            icon={<FormDown size='small' />}
            onClick={() => { setPan({ x: 0, y: +PAN_STEP }, true) }}
          />  
        </Box>
        <CompactButton
          icon={<FormNext size='small' />}
          onClick={() => { setPan({ x: +PAN_STEP, y: 0 }, true) }}
        />
      </Box>
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
