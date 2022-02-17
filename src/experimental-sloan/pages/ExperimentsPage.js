import React from 'react'
import { Anchor, Box, Button, Heading, Paragraph } from 'grommet'
import { FormNext as NextIcon } from 'grommet-icons'
import styled from 'styled-components'

import subjects from '../data/subjects.json'

const ConstrainedParagraph = styled(Paragraph)`
  max-width: 32rem;
`

const ConstrainedBox = styled(Box)`
  max-width: 32rem;
`

function ExperimentsPage () {
  return (
    <Box>
      <Heading as="h2" size="xsmall">Welcome to the SLOAN Grant Experiments page!</Heading>
      <ConstrainedParagraph>
        <b>What:</b> these components are "Cluster Viewers", able to view an astronomical
        Subject in the context of the cluster of similar astronomical objects that it
        exists in.
      </ConstrainedParagraph>
      <ConstrainedParagraph>
        <b>Why:</b> we're grafting these experiments onto Zoo Notes because it's easier to
        do so than to spin up a new repo and website. We fully intend to transfer any
        successful experiments to a new home.
      </ConstrainedParagraph>

    </Box>
  )
}

export { ExperimentsPage }
export default ExperimentsPage
