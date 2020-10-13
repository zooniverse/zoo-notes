import React from 'react'
import { Anchor, Box, Footer, Header, Heading, Image, Menu, Text } from 'grommet'
import { Menu as MenuIcon } from 'grommet-icons'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'

import zooniverseLogo from 'images/zooniverse-logo-white-192.png'
// import zooniverseLogo from 'images/zooniverse-word-black.png'
import { mergedTheme } from 'theme.js'

const StyledHeader = styled(Header)`
  background: ${mergedTheme.global.colors['neutral-2']};
  color: #fff;
`

const StyledHeading = styled(Heading)`
  flex: 1 1 auto;
`

function MainLayout ({ children }) {
  return (
    <>
      <StyledHeader pad={{ vertical: '0', horizontal: '0.5rem' }} direction='row' justify='stretch'>
        <Anchor href='/'>
          <Box size='xsmall' flex={false} width='2rem' height='2rem'>
            <Image alt='Zooniverse' src={zooniverseLogo} fit='contain' />
          </Box>
        </Anchor>
        <StyledHeading flex='grow' border={true} background='#cce'>
          Zooniverse - Zoo Notes
        </StyledHeading>
        <Menu
          a11yTitle='Main Menu button'
          dropAlign={{ 'top': 'top', 'right': 'right', }}
          icon={<MenuIcon color='#ffffff' />}
          items={[
            {
              label: 'Home',
              href: '/',
            },
            {
              label: 'Observe all Classifications',
              href: '/view',
            },
          ]}
        />
      </StyledHeader>
      <Box
        pad='small'
      >
        { children }
      </Box>
      <Footer direction='column'>
        <Text>Powered by <Anchor href='https://www.zooniverse.org' target='_blank'>the Zooniverse</Anchor></Text>
      </Footer>
    </>
  )
}

export { MainLayout }
export default withRouter(MainLayout)
