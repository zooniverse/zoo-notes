import { useContext, useEffect, useState } from 'react'
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
  const store = useContext(AppContext)
  const colors = mergedTheme.global.colors
  const [expand, setExpand] = useState(false)
  
  const { selectedTask, selectedTaskType } = store.workflow
  const stats = store.aggregations.stats
  const aggregationData = store.aggregations.current && store.aggregations.current.workflow
  
  // Is the selected task best seen in an expanded view?
  useEffect(() => {
    if (selectedTaskType === 'single') setExpand(true)
  }, [selectedTaskType])  // Only listen when selectedTaskType changes.

  const { IDLE, ERROR, LOADING, READY } = ASYNC_STATES
  switch (store.aggregations.asyncState) {
    case IDLE: {
      return null
    }
    case ERROR: {
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
    case LOADING:
    case READY: {
      let AggregationType = null
      if (!aggregationData) {
        return (
          <LargeMessageBox wide={false}>
            <Text>Loading Workflow and Aggregations...</Text>
          </LargeMessageBox>
        )
      }
  
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
              selectedTask={selectedTask}
              stats={stats}
            />)
          break
    
        default:
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
    default: {
      return (
        <LargeMessageBox wide={false}>
          <Text>Loading Workflow and Aggregations...</Text>
        </LargeMessageBox>
      )
    }
  }
}

export default observer(AggregationsViewer)
