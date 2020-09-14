import React from 'react'
import { Box } from 'grommet'
import styled from 'styled-components'
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
  const svgEle = React.useRef(null)
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
      const svg = svgEle.current || {}
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
      // store.image.setScale(target)
      // TODO
    }
    
    onLoad()
    
  }, [imageObject, src])
  
  if (store.subject.asyncState !== ASYNC_STATES.READY) return null

  return (
    <Box
      background={{ color: '#858585' }}
      height='large'
      round='xsmall'
      ref={svgEle}
    >
      <SubjectViewer
        ref={svgEle}
        imageUrl={src}
        imageWidth={imageWidth}
        imageHeight={imageHeight}
      />
    </Box>
  )
}

export default observer(SubjectViewerContainer)
