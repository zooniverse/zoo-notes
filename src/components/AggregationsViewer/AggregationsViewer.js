import React from 'react'
import { Box, Text } from 'grommet'
import AppContext from 'stores'
import { observer } from 'mobx-react'
import ASYNC_STATES from 'helpers/asyncStates'
import { mergedTheme } from 'theme'
import styled from 'styled-components'

import Drawing from './aggregation-types/Drawing'

function AggregationsViewer () {
  const store = React.useContext(AppContext)
  const colors = mergedTheme.global.colors
  
  
  
  return (
    <Box
      background={{ color: colors['light-1'] }}
      round='xsmall'
      pad='xsmall'
    >
      <Drawing
    
      />
    </Box>
  )
}

export default observer(AggregationsViewer)
