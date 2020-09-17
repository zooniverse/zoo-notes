import React from 'react'
import { Box } from 'grommet'
import AppContext from 'stores'
import { observer } from 'mobx-react'
import ASYNC_STATES from 'helpers/asyncStates'
import { mergedTheme } from 'theme'

import SubjectViewer from './SubjectViewer'
import AggregationsPane from './components/AggregationsPane'

function findCurrentSrc(locations, index) {
  if (!locations || locations.length === 0) return '';
  const location = locations[index]
  return Object.values(location)[0]
}

function SubjectViewerContainer() {
  const store = React.useContext(AppContext)
  const colors = mergedTheme.global.colors
  
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
  
  // TMP
  const reductions = store.aggregations.reductions
  const extracts = store.aggregations.extracts
  
  const showReductions = true
  const showExtracts = true
  
  return (
    <Box
      background={{ color: colors['light-6'] }}
      height='medium'
      round='xsmall'
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
    </Box>
  )
}

export default observer(SubjectViewerContainer)
