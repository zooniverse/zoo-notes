import React from 'react'
import { Box } from 'grommet'
import styled from 'styled-components'
import AppContext from 'stores'
import { observer } from 'mobx-react'

function SubjectViewerContainer() {
  const store = React.useContext(AppContext)

  return (
    <Box
      background={{ color: '#858585' }}
      height='large'
      round='xsmall'
    >
      123
    </Box>
  )
}

export default observer(SubjectViewerContainer)
