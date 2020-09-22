import React from 'react'
import { Anchor, Box, Heading, Paragraph } from 'grommet'
import { observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import AppContext from 'stores'

const ConstrainedParagraph = styled(Paragraph)`
  max-width: 40rem;
`

function HomePage () {
  const store = React.useContext(AppContext)
  
  React.useEffect(() => {
    return () => {}
  })
  
  return (
    <Box>
      <Heading as="h2" size="xsmall">Welcome to Zoo Notes!</Heading>
      <ConstrainedParagraph>...</ConstrainedParagraph>
    </Box>
  )
}

export { HomePage }
export default withRouter(observer(HomePage))
