import React from 'react'
import { observer } from 'mobx-react'
import AppContext from 'stores'
import AnnotationsPane from './AnnotationsPane'

function AnnotationsPaneContainer({ x, y }) {
  let reductionLines = []
  const store = React.useContext(AppContext)

  return (
    <AnnotationsPane
      x={x}
      y={y}
    />
  )
}

export default observer(AnnotationsPaneContainer)
