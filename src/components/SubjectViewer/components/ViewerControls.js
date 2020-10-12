import React from 'react'
import PropTypes from 'prop-types'
import { Button, Box, Select, Text } from 'grommet'
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
  page,
  maxPages,
  resetView,
  selectedTaskType,
  setPan,
  setPage,
  setZoom,
  setShowExtracts,
  setShowReductions,
  showExtracts,
  showReductions,
}) {
  const EmptyIcon = <Box round='small' background='light-4' border={{ color: '#ffffff', size: 'small' }} pad='xxsmall' />
  const ExtractsIcon = <Box round='small' background='accent-3' border={{ color: '#ffffff', size: 'small' }} pad='xxsmall' />
  const ReductionsIcon = <Box round='small' background='accent-4' border={{ color: '#ffffff', size: 'small' }} pad='xxsmall' />
    
  const pageOptions = []
  for (let i = 0 ; i < maxPages ; i++) pageOptions.push({ label: `Page ${i+1}`, value: i })
  
  return (
    <Box
      align='center'
      direction='row'
      wrap={true}
    >
      <Box
        align='center'
        direction='row'
      >
        <CompactButton
          a11yTitle='Zoom In button'
          icon={<ZoomIn size='small' />}
          onClick={() => { setZoom(ZOOM_STEP, true) }}
          size='large'
        />
        <CompactButton
          a11yTitle='Zoom Out button'
          icon={<ZoomOut size='small' />}
          onClick={() => { setZoom(-ZOOM_STEP, true) }}
        />
        <CompactButton
          a11yTitle='Reset View button'
          icon={<EmptyCircle size='small' />}
          onClick={() => { resetView() }}
        />
      </Box>
      <Box
        align='center'
        direction='row'
      >
        <CompactButton
          a11yTitle='Pan Left button'
          icon={<FormPrevious size='small' />}
          onClick={() => { setPan({ x: -PAN_STEP, y: 0 }, true) }}
        />
        <Box>
          <CompactButton
            a11yTitle='Pan Up button'
            icon={<FormUp size='small' />}
            onClick={() => { setPan({ x: 0, y: -PAN_STEP }, true) }}
          />
          <CompactButton
            a11yTitle='Pan Down button'
            icon={<FormDown size='small' />}
            onClick={() => { setPan({ x: 0, y: +PAN_STEP }, true) }}
          />  
        </Box>
        <CompactButton
          a11yTitle='Pan Right button'
          icon={<FormNext size='small' />}
          onClick={() => { setPan({ x: +PAN_STEP, y: 0 }, true) }}
        />
      </Box>
      {(selectedTaskType === 'drawing') &&
        <Box
          align='center'
          direction='row'
        >
          <CompactButton
            a11yTitle={`Show Extracts button ${(showExtracts) ? '(enabled)' : '(disabled)'}`}
            icon={(showExtracts) ? ExtractsIcon : EmptyIcon}
            label={<Text size='small'>Show raw points</Text>}
            onClick={() => { setShowExtracts(!showExtracts) }}
            plain={true}
            margin={{ horizontal: 'xsmall', vertical: 'none' }}
          />
          <CompactButton
            a11yTitle={`Show Reductions button ${(showReductions) ? '(enabled)' : '(disabled)'}`}
            icon={(showReductions) ? ReductionsIcon : EmptyIcon}
            label={<Text size='small'>Show averaged points</Text>}
            onClick={() => { setShowReductions(!showReductions) }}
            plain={true}
            margin={{ horizontal: 'xsmall', vertical: 'none' }}
          />
        </Box>
      }
      {(pageOptions.length > 1) &&
        <Box
          align='center'
          direction='row'
        >
          <Select
            labelKey='label'
            options={pageOptions}
            onChange={({ option }) => { setPage(option.value) }}
            size='small'
            value={pageOptions[page]}
            valueKey='value'
          />
        </Box>
      }
    </Box>
  )
}

ViewerControls.propTypes = {
  page: PropTypes.number,
  maxPages: PropTypes.number,
  resetView: PropTypes.func,
  selectedTaskType: PropTypes.string,
  setPan: PropTypes.func,
  setPage: PropTypes.func,
  setZoom: PropTypes.func,
  setShowExtracts: PropTypes.func,
  setShowReductions: PropTypes.func,
  showExtracts: PropTypes.bool,
  showReductions: PropTypes.bool,
}

ViewerControls.defaultProps = {
  page: 0,
  maxPages: 1,
  resetView: () => {},
  selectedTaskType: '',
  setPan: () => {},
  setPage: () => {},
  setZoom: () => {},
  setShowExtracts: () => {},
  setShowReductions: () => {},
  showExtracts: true,
  showReductions: true,
}

export default ViewerControls
