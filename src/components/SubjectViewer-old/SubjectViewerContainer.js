import React from 'react'
import { Box } from 'grommet'
import styled from 'styled-components'
import AppContext from 'stores'
import { observer } from 'mobx-react'
import SubjectViewerHeader from './components/SubjectViewerHeader'
import ImageTools from './components/ImageTools'
import SVGView from './components/SVGView'
import AsyncMessages from './components/AsyncMessages'

const RelativeBox = styled(Box)`
  position: relative;
`

const AbsoluteBox = styled(Box)`
  pointer-events: none;
  position: absolute;
`

const ToolsBox = styled(AbsoluteBox)`
  pointer-events: all;
`

function SubjectViewerContainer() {
  const store = React.useContext(AppContext)
  const [showTools, setTools] = React.useState(false)
  const onMouseOver = e => {
    setTools(true)
  }
  const onMouseLeave = e => setTools(false)

  return (
    <Box
      background={{ color: '#858585' }}
      height='large'
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
      round='xsmall'
    >
      {/*<SubjectViewerHeader />*/}
      <RelativeBox fill>
        <AbsoluteBox fill>
          <AsyncMessages error={store.subject.error} subjectState={store.subject.asyncState} />
          <ToolsBox>
            {showTools && <ImageTools />}
          </ToolsBox>
        </AbsoluteBox>
        <SVGView />
      </RelativeBox>
    </Box>
  )
}

export default observer(SubjectViewerContainer)
