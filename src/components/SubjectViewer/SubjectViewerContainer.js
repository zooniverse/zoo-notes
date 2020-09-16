import React from 'react'
import { Box } from 'grommet'
import AppContext from 'stores'
import { observer } from 'mobx-react'
import ASYNC_STATES from 'helpers/asyncStates'

import SubjectViewer from './SubjectViewer'

function findCurrentSrc(locations, index) {
  if (!locations || locations.length === 0) return '';
  const location = locations[index]
  return Object.values(location)[0]
}

function SubjectViewerContainer() {
  const store = React.useContext(AppContext)
  
  const TMP_INDEX = 0
  const src = findCurrentSrc(store.subject.current.locations, TMP_INDEX)
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
    
  }, [imageObject, src])
  
  if (store.subject.asyncState !== ASYNC_STATES.READY) return null
  
  // Extract aggregations
  // TODO: plenty of improvements can be done here!
  // ----------------
  let aggregationsData = []
  try {
    const INDEX = 0
    const PAGE = 0
    if (
      store.aggregations.asyncState === ASYNC_STATES.READY
      && store.aggregations.current && store.aggregations.current.workflow.reductions[INDEX].data
    ) {
      const frame = store.aggregations.current.workflow.reductions[INDEX].data[`frame${PAGE}`]
      const points_x = frame['T0_tool0_points_x'] || []  // TODO: make flexible
      const points_y = frame['T0_tool0_points_y'] || []
      
      for (let i = 0; i < points_x.length && i < points_y.length; i++) {
        aggregationsData.push({ x: points_x[i], y: points_y[i] })
      }
    }
  } catch (err) {
    console.warn(err)
    aggregationsData = []
  }
  // ----------------

  return (
    <Box
      background={{ color: '#858585' }}
      height='medium'
      round='xsmall'
      ref={containerRef}
    >
      <SubjectViewer
        ref={containerRef}
        aggregationsData={aggregationsData}
        imageUrl={src}
        imageWidth={imageWidth}
        imageHeight={imageHeight}
        panX={store.viewer.panX}
        panY={store.viewer.panY}
        zoom={store.viewer.zoom}
        setPan={store.viewer.setPan}
        setZoom={store.viewer.setZoom}
      />
    </Box>
  )
}

export default observer(SubjectViewerContainer)
