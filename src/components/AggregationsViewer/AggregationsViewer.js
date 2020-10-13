import React from 'react'
import { Box, Button, Text } from 'grommet'
import AppContext from 'stores'
import { observer } from 'mobx-react'
import ASYNC_STATES from 'helpers/asyncStates'
import { mergedTheme } from 'theme'
import styled from 'styled-components'
import { Contract as ContractIcon, Expand as ExpandIcon } from 'grommet-icons'

import DrawingTask from './components/DrawingTask'
import SingleTask from './components/SingleTask'
import LargeMessageBox from 'components/LargeMessageBox'

const CompactBox = styled(Box)`
  ${props => (props.expand)
    ? 'width: 48rem;'
    : 'width: 16rem;'
  }
  min-width: 16rem;
  overflow: auto;
`

const CompactButton = styled(Button)`
  padding: 10px
`

function AggregationsViewer () {
  const store = React.useContext(AppContext)
  const colors = mergedTheme.global.colors
  const [expand, setExpand] = React.useState(false)
  
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
          expand={expand}
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
      expand={expand}
      round='xsmall'
      pad='xsmall'
    >
      {(selectedTaskType === 'single') && (
        <Box
          direction='row'
        >
          <CompactButton
            a11yTitle='Expand/collapse Aggregation panel'
            icon={(expand)
              ? <ContractIcon size='small' />
              : <ExpandIcon size='small' />
            }
            onClick={() => { setExpand(!expand) }}
          />
        </Box>
      )}
      {AggregationType}
    </CompactBox>
  )
}

export default observer(AggregationsViewer)
