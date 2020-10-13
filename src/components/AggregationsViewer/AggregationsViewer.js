import React from 'react'
import { Box, Button, Text } from 'grommet'
import AppContext from 'stores'
import { observer } from 'mobx-react'
import ASYNC_STATES from 'helpers/asyncStates'
import { mergedTheme } from 'theme'
import styled, { css } from 'styled-components'
import { Contract as ContractIcon, Expand as ExpandIcon } from 'grommet-icons'

import DrawingTask from './components/DrawingTask'
import SingleTask from './components/SingleTask'
import LargeMessageBox from 'components/LargeMessageBox'

const CompactBox = styled(Box)`
  ${props => 
    css`width: ${props.maxWidth}em;`
  }
  overflow: auto;
`

const CompactButton = styled(Button)`
  padding: 10px
`

const SIZE_SMALL = 16
const SIZE_LARGE = 48

function AggregationsViewer () {
  const store = React.useContext(AppContext)
  const colors = mergedTheme.global.colors
  const [maxWidth, setMaxWidth] = React.useState(SIZE_SMALL)
  
  if (store.workflow.asyncState === ASYNC_STATES.ERROR || store.aggregations.asyncState === ASYNC_STATES.ERROR) {
    return (
      <LargeMessageBox wide={false}>
        {(store.workflow.asyncState === ASYNC_STATES.ERROR) &&
          <>
            <Text>ERROR: Could not fetch Workflow.</Text>
            <Text>{store.workflow.error}</Text>
          </>
        }
        {(store.aggregations.asyncState === ASYNC_STATES.ERROR) &&
          <>
            <Text>ERROR: Could not fetch Aggregations.</Text>
            <Text>{store.aggregations.error}</Text>
          </>
        }
      </LargeMessageBox>
    )
  }
  
  if (store.workflow.asyncState === ASYNC_STATES.LOADING || store.aggregations.asyncState === ASYNC_STATES.LOADING) {
    return (
      <LargeMessageBox wide={false}>
        <Text>Loading Workflow and Aggregations...</Text>
      </LargeMessageBox>
    )
  }

  let AggregationType = null
  const selectedTask = store.workflow.selectedTask
  const selectedTaskType = store.workflow.selectedTaskType
  const selectedTaskIndex = store.workflow.selectedTaskIndex
  const stats = store.aggregations.stats
  const aggregationData = store.aggregations.current && store.aggregations.current.workflow
  
  switch (selectedTaskType) {
    case 'drawing':
      AggregationType = (
        <DrawingTask
          selectedTask={selectedTask}
          stats={stats}
        />)
      break
        
    case 'single':
      AggregationType = (
        <SingleTask
          aggregationData={aggregationData}
          selectedTaskIndex={selectedTaskIndex}
          selectedTask={selectedTask}
          stats={stats}
        />)
      break
  }

  if (!AggregationType) return null
  
  return (
    <CompactBox
      background={{ color: colors['light-1'] }}
      maxWidth={maxWidth}
      round='xsmall'
      pad='xsmall'
    >
      {(selectedTaskType === 'single') && (
        <Box
          direction='row'
        >
          <CompactButton
            a11yTitle='Expand/collapse Aggregation panel'
            icon={(maxWidth > SIZE_SMALL)
              ? <ContractIcon size='small' />
              : <ExpandIcon size='small' />
            }
            onClick={() => {
              setMaxWidth((maxWidth > SIZE_SMALL) ? SIZE_SMALL : SIZE_LARGE)
            }}
          />
        </Box>
      )}
      {AggregationType}
    </CompactBox>
  )
}

export default observer(AggregationsViewer)
