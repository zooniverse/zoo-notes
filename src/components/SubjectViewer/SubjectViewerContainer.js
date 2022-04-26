import { useContext, useEffect, useRef, useState } from 'react'
import { Box, Text } from 'grommet'
import AppContext from 'stores'
import { observer } from 'mobx-react'
import ASYNC_STATES from 'helpers/asyncStates'
import { mergedTheme } from 'theme'
import styled from 'styled-components'

import SubjectViewer from './SubjectViewer'
import AggregationsPane from './components/AggregationsPane'
import ViewerControls from './components/ViewerControls'
import WorkflowControls from './components/WorkflowControls'
import LargeMessageBox from 'components/LargeMessageBox'

const ContainerBox = styled(Box)`
  min-width: 16rem;
`

const LargeBox = styled(Box)`
  height: 60vh;
  min-height: 20rem;
  flex: 1 1 auto;
`

function findCurrentSrc (locations, index) {
  if (!locations || locations.length === 0) return '';
  const location = locations[index]
  return Object.values(location)[0]
}

function SubjectViewerContainer () {
  const store = useContext(AppContext)
  const colors = mergedTheme.global.colors
  const locations = store.subject.locations
  
  const src = findCurrentSrc(locations, store.subject.page)
  const containerRef = useRef(null)
  const [imageObject, setImageObject] = useState(new Image())
  const [imageWidth, setImageWidth] = useState(0)
  const [imageHeight, setImageHeight] = useState(0)

  useEffect(() => {
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
    return (
      <LargeMessageBox>
        <Text>ERROR: Could not fetch Subject.</Text>
        <Text>{store.subject.error}</Text>
      </LargeMessageBox>
    )
  }
  
  if (store.subject.asyncState === ASYNC_STATES.LOADING) {
    return (
      <LargeMessageBox wide={false}>
        <Text>Loading Subject...</Text>
      </LargeMessageBox>
    )
  }
  
  if (store.subject.asyncState !== ASYNC_STATES.READY) return null
  
  const selectedTaskType = store.workflow.selectedTaskType
  
  const reductions = store.aggregations.reductions
  const extracts = store.aggregations.extracts
  
  const showReductions = store.viewer.showReductions
  const showExtracts = store.viewer.showExtracts
  
  return (
    <ContainerBox
      background={{ color: colors['light-1'] }}
      flex={true}
      pad='xsmall'
      round='xsmall'
    >
      <Box direction='row' pad={{ vertical: 'xsmall' }}>
        <WorkflowControls
          setTaskId={store.workflow.setTaskId}
          taskId={store.workflow.taskId}
          workflowAsyncState={store.workflow.asyncState}
          workflowError={store.workflow.error}
          workflowDisplayName={store.workflow.current && store.workflow.current.display_name}
          workflowId={store.workflow.current && store.workflow.current.id}
          workflowTasks={store.workflow.tasks}
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
                fill={colors['neutral-5']}
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
                fill={colors['neutral-2']}
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
      </Box>
      <ViewerControls
        page={store.subject.page}
        maxPages={locations.length}
        resetView={store.viewer.resetView}
        selectedTaskType={selectedTaskType}
        setPan={store.viewer.setPan}
        setPage={store.subject.setPage}
        setZoom={store.viewer.setZoom}
        setShowExtracts={store.viewer.setShowExtracts}
        setShowReductions={store.viewer.setShowReductions}
        showExtracts={store.viewer.showExtracts}
        showReductions={store.viewer.showReductions}
      />
    </ContainerBox>
  )
}

export default observer(SubjectViewerContainer)
