import React from 'react'
import PropTypes from 'prop-types'
import { Button, Box, Text } from 'grommet'
import {
  EmptyCircle, FormDown, FormNext, FormPrevious, FormUp, ZoomIn, ZoomOut,
} from 'grommet-icons'
import styled from 'styled-components'
import { mergedTheme } from 'theme'

const PAN_STEP = 10
const ZOOM_STEP = 0.1

const CompactButton = styled(Button)`
  padding: 10px
`

const ViewerControls = function ({
  resetView,
  setPan,
  setZoom,
  setShowExtracts,
  setShowReductions,
  showExtracts,
  showReductions,
}) {
  const EmptyIcon = <Box round='small' background='light-4' border={{ color: '#ffffff', size: 'small' }} pad='xxsmall' />
  const ExtractsIcon = <Box round='small' background='accent-3' border={{ color: '#ffffff', size: 'small' }} pad='xxsmall' />
  const ReductionsIcon = <Box round='small' background='accent-4' border={{ color: '#ffffff', size: 'small' }} pad='xxsmall' />
  
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
        <CompactButton
          icon={(showExtracts) ? ExtractsIcon : EmptyIcon}
          label={<Text size='small'>Show raw points</Text>}
          onClick={() => { setShowExtracts(!showExtracts) }}
          plain={true}
          margin={{ horizontal: 'xsmall', vertical: 'none' }}
        />
        <CompactButton
          icon={(showReductions) ? ReductionsIcon : EmptyIcon}
          label={<Text size='small'>Show aggregated points</Text>}
          onClick={() => { setShowReductions(!showReductions) }}
          plain={true}
          margin={{ horizontal: 'xsmall', vertical: 'none' }}
        />
      </Box>
    </Box>
  )
}

ViewerControls.propTypes = {
  resetView: PropTypes.func,
  setPan: PropTypes.func,
  setZoom: PropTypes.func,
  setShowExtracts: PropTypes.func,
  setShowReductions: PropTypes.func,
  showExtracts: PropTypes.bool,
  showReductions: PropTypes.bool,
}

ViewerControls.defaultProps = {
  resetView: () => {},
  setPan: () => {},
  setZoom: () => {},
  setShowExtracts: () => {},
  setShowReductions: () => {},
  showExtracts: true,
  showReductions: true,
}

export default ViewerControls
