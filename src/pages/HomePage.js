import React from 'react'
import { Anchor, Box, Button, Heading, Paragraph } from 'grommet'
import { FormNext as NextIcon } from 'grommet-icons'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import WorkflowInputBox from 'components/WorkflowInputBox'

const ConstrainedParagraph = styled(Paragraph)`
  max-width: 32rem;
`

const ConstrainedBox = styled(Box)`
  max-width: 32rem;
`

function HomePage () {
  React.useEffect(() => {
    return () => {}
  })
  
  return (
    <Box>
      <Heading as="h2" size="xsmall">Welcome to Zoo Notes!</Heading>
      <ConstrainedParagraph>
        This is a tool that lets you observe <b>recently classified Subjects</b> from the <Anchor href='https://www.zooniverse.org' target='_blank'>Zooniverse,</Anchor> and then examine the <b>consensus results</b> based on the answers from multiple volunteers.
      </ConstrainedParagraph>
      <ConstrainedParagraph>
        At the moment we are limited to showing consensus results from <b>Point markings.</b>
      </ConstrainedParagraph>
      
      <Box direction='row'>
        <Box pad={{ vertical: 'small', horizontal: 'small' }}>
          <NextIcon />
        </Box>
        <Box>
          <ConstrainedParagraph>
            If there's a specific Workflow you want to observe, enter its ID below. You'll then be able to see recently-viewed Subjects appear as volunteers submit <b>Classifications</b> on the main Zooniverse website.
          </ConstrainedParagraph>
          <ConstrainedBox>
            <WorkflowInputBox />
          </ConstrainedBox>
        </Box>
      </Box>
      
      <Box direction='row'>
        <Box pad={{ vertical: 'small', horizontal: 'small' }}>
          <NextIcon />
        </Box>
        <Box>
          <ConstrainedParagraph>
            If you want to observe EVERY Workflow, click the button below. Good luck, though! This will display a LOT of results VERY quickly, so its practical use is fairly limited. 
          </ConstrainedParagraph>
          <ConstrainedBox direction='row'>
            <Link to='/view'>
              <Button
                gap='xsmall'
                label='Observe all Classifications'
                reverse={true}
                icon={<NextIcon size='small' />}
              />
            </Link>
          </ConstrainedBox>
        </Box>
      </Box>

    </Box>
  )
}

export { HomePage }
export default HomePage
