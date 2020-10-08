import React from 'react'
import { Box, Text } from 'grommet'
import AppContext from 'stores'
import { observer } from 'mobx-react'
import ASYNC_STATES from 'helpers/asyncStates'
import { mergedTheme } from 'theme'
import styled from 'styled-components'

import SubjectViewer from './SubjectViewer'
import AggregationControls from './components/AggregationControls'
import AggregationsPane from './components/AggregationsPane'
import ViewerControls from './components/ViewerControls'
import WorkflowControls from './components/WorkflowControls'
import LargeMessageBox from 'components/LargeMessageBox'

const LargeBox = styled(Box)`
  min-height: 60vh;
  flex: 1 1 auto;
`

function findCurrentSrc(locations, index) {
  if (!locations || locations.length === 0) return '';
  const location = locations[index]
  return Object.values(location)[0]
}

function SubjectViewerContainer() {
  const store = React.useContext(AppContext)
  const colors = mergedTheme.global.colors
  const locations = store.subject.locations
  
  const src = findCurrentSrc(locations, store.subject.page)
  const containerRef = React.useRef(null)
  const [imageObject, setImageObject] = React.useState(new Image())
  const [imageWidth, setImageWidth] = React.useState(0)
  const [imageHeight, setImageHeight] = React.useState(0)

  React.useEffect(() => {
    async function fetchImage() {
      return new Promise((resolve, reject) => {
        imageObject.onload = () => resolve(imageObject)
        imageObject.src = src
        return imageObject
      })
    }

    async function preLoad() {
      const image = await fetchImage()
      setImageObject(image)
      return image
    }

    async function getImageSize() {
      const image = await preLoad()
      const svg = containerRef.current || {}
      setImageWidth(image.naturalWidth)
      setImageHeight(image.naturalHeight)
      return {
        clientHeight: svg.clientHeight,
        clientWidth: svg.clientWidth,
        naturalHeight: image.naturalHeight,
        naturalWidth: image.naturalWidth
      }
    }

    async function onLoad() {
      const target = await getImageSize()
      
      store.viewer.setImageSize({ width: target.naturalWidth, height: target.naturalHeight })
      store.viewer.setViewerSize({ width: target.clientHeight, height: target.clientHeight })
      store.viewer.resetView()
    }
    
    onLoad()
    
  }, [imageObject, src, store.viewer])
  
  
  if (store.subject.asyncState === ASYNC_STATES.ERROR) {
    console.log(mergedTheme)
    return (
      <LargeMessageBox>
        <Text>ERROR: Could not fetch Subject.</Text>
        <Text>{store.subject.error}</Text>
      </LargeMessageBox>
    )
  }
  
  if (store.subject.asyncState !== ASYNC_STATES.READY) return null
  
  const reductions = store.aggregations.reductions
  const extracts = store.aggregations.extracts
  
  const showReductions = store.viewer.showReductions
  const showExtracts = store.viewer.showExtracts
  
  const workflowTasks = store.workflow.current && store.workflow.current.tasks
  
  return (
    <Box
      background={{ color: colors['light-1'] }}
      round='xsmall'
      pad='xsmall'
    >
      <Box direction='row' pad={{ vertical: 'xsmall' }}>
        <WorkflowControls
          setTaskId={store.workflow.setTaskId}
          taskId={store.workflow.taskId}
          workflowAsyncState={store.workflow.asyncState}
          workflowError={store.workflow.error}
          workflowDisplayName={store.workflow.current && store.workflow.current.display_name}
          workflowId={store.workflow.current && store.workflow.current.id}
          workflowTasks={workflowTasks}
        />
      </Box>
      <Box direction='row'>
        <LargeBox
          background={{ color: colors['light-6'] }}
          ref={containerRef}
        >
          <SubjectViewer
            ref={containerRef}
            imageUrl={src}
            imageWidth={imageWidth}
            imageHeight={imageHeight}
            panX={store.viewer.panX}
            panY={store.viewer.panY}
            zoom={store.viewer.zoom}
            setPan={store.viewer.setPan}
            setZoom={store.viewer.setZoom}
          >
            {(showExtracts) &&
              <AggregationsPane
                fill={colors['accent-3']}
                offsetX={imageWidth * -0.5}
                offsetY={imageHeight * -0.5}
                points={extracts}
                pointSize={12}
                stroke={'#ffffff'}
                zoom={store.viewer.zoom}
              />
            }
            {(showReductions) &&
              <AggregationsPane
                fill={colors['accent-4']}
                offsetX={imageWidth * -0.5}
                offsetY={imageHeight * -0.5}
                points={reductions}
                pointSize={16}
                stroke={'#ffffff'}
                zoom={store.viewer.zoom}
              />
            }
          </SubjectViewer>
        </LargeBox>
        <AggregationControls
          stats={store.aggregations.stats}
          workflowTasks={workflowTasks}
        />
      </Box>
      <ViewerControls
        page={store.subject.page}
        maxPages={locations.length}
        resetView={store.viewer.resetView}
        setPan={store.viewer.setPan}
        setPage={store.subject.setPage}
        setZoom={store.viewer.setZoom}
        setShowExtracts={store.viewer.setShowExtracts}
        setShowReductions={store.viewer.setShowReductions}
        showExtracts={store.viewer.showExtracts}
        showReductions={store.viewer.showReductions}
      />
    </Box>
  )
}

export default observer(SubjectViewerContainer)
