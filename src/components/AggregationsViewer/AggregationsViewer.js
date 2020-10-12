import React from 'react'
import { Box, Text } from 'grommet'
import AppContext from 'stores'
import { observer } from 'mobx-react'
import ASYNC_STATES from 'helpers/asyncStates'
import { mergedTheme } from 'theme'
import styled from 'styled-components'

import DrawingTask from './components/DrawingTask'
import SingleTask from './components/SingleTask'
import LargeMessageBox from 'components/LargeMessageBox'

const CompactBox = styled(Box)`
  max-width: 12em;
`

function AggregationsViewer () {
  const store = React.useContext(AppContext)
  const colors = mergedTheme.global.colors
  
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
      round='xsmall'
      pad='xsmall'
    >
      {AggregationType}
    </CompactBox>
  )
}

export default observer(AggregationsViewer)
