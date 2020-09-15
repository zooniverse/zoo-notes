import React from 'react'
import { Box, Header, Heading, Image } from 'grommet'
import { withRouter, Link } from 'react-router-dom'
import styled, { css } from 'styled-components'

import zooniverseLogo from 'images/zooniverse-logo-white-192.png'
// import zooniverseLogo from 'images/zooniverse-word-black.png'
import { mergedTheme } from 'theme.js'

const StyledHeader = styled(Header)`
  background: ${mergedTheme.global.colors.brand};
  color: #fff;
`

function MainLayout ({ children }) {
  
  console.log(mergedTheme)
  
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
    </>
  )
}

export { MainLayout }
export default withRouter(MainLayout)
