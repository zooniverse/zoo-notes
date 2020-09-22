import React from 'react'
import styled from 'styled-components'
import { Box, Text } from 'grommet'

const LargeBox = styled(Box)`
  min-width: 100%;
  min-height: 10em;
`

const LargeMessageBox = function ({
  children
}) {
  return (
    <LargeBox
      background='#e5e5e5'
      align='center'
      justify='center'
      round='xsmall'
      size='medium'
      pad='small'
    >
      {children}
    </LargeBox>
  )
}

LargeMessageBox.propTypes = {}

LargeMessageBox.defaultProps = {}

export default LargeMessageBox
