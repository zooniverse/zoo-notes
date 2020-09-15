import React from 'react'
import { Anchor, Box, Footer, Header, Heading, Image, Text } from 'grommet'
import { withRouter } from 'react-router-dom'
import styled, { css } from 'styled-components'

import zooniverseLogo from 'images/zooniverse-logo-white-192.png'
// import zooniverseLogo from 'images/zooniverse-word-black.png'
import { mergedTheme } from 'theme.js'

const StyledHeader = styled(Header)`
  background: ${mergedTheme.global.colors['neutral-2']};
  color: #fff;
`

function MainLayout ({ children }) {
  return (
    <>
      <StyledHeader pad="1rem" direction="row" justify="stretch">
        <Box size="xsmall" flex={false} width="2rem" height="2rem">
          <Image alt="Zooniverse" src={zooniverseLogo} fit="contain" />
        </Box>
        <Heading size="small" flex={true} border={true} background="#cce">
          Zooniverse - Zoo Notes
        </Heading>
      </StyledHeader>
      <Box
        pad='small'
      >
        { children }
      </Box>
      <Footer direction="column">
        <Text>Powered by <Anchor href="https://www.zooniverse.org">the Zooniverse</Anchor></Text>
      </Footer>
    </>
  )
}

export { MainLayout }
export default withRouter(MainLayout)
