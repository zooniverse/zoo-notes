import React from 'react'
import { Box, Header, Heading, Image } from 'grommet'
import { withRouter, Link } from 'react-router-dom'
import zooniverseLogo from 'images/zooniverse-logo-black-192.png'
// import zooniverseLogo from 'images/zooniverse-word-black.png'

function MainLayout ({ children }) {
  return (
    <>
      <Header pad="1rem" direction="row" justify="stretch">
        <Box size="xsmall" flex={false} width="2rem" height="2rem">
          <Image alt="Zooniverse" src={zooniverseLogo} fit="contain" />
        </Box>
        <Heading size="small" flex={true} border={true} background="#cce">
          Zooniverse - Zoo Notes
        </Heading>
        
      </Header>
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
