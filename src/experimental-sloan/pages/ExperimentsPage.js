import { useState } from 'react'
import { Box, CheckBox, Heading, Paragraph } from 'grommet'
import styled from 'styled-components'

import ClusterViewer1 from '../components/ClusterViewer1'

import subjects from '../data/subjects.json'
import clusters from '../data/clusters.json'

const ConstrainedParagraph = styled(Paragraph)`
  max-width: 32rem;
`

const ConstrainedBox = styled(Box)`
  max-width: 32rem;
`

function ExperimentsPage () {
  const [ ex1_showMain, ex1_setShowMain ] = useState(true)

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

      <ConstrainedBox
        border={true}
        pad='small'
        margin='small'
      >
        <Heading as="h3">Experiment 1</Heading>
        <ConstrainedParagraph>
          Let's, say, <b>show all galaxies similar to Galaxy X</b>.
          This cluster has <b>5 galaxies</b>.
          The galaxy in the centre is Galaxy X, the "main galaxy" to which the
          other galaxies in the cluster are being compared to.
        </ConstrainedParagraph>
        <ClusterViewer1
          mainSubjectId={ex1_showMain ? 61582335 : undefined}
          subjects={subjects}
          cluster={clusters['subject_id=61582335']}
        />
        <Box>
          <CheckBox
            checked={ex1_showMain}
            label='Show main galaxy'
            onChange={(e) => ex1_setShowMain(e.target.checked) }
            size='small'
          />
        </Box>
      </ConstrainedBox>

      <ConstrainedBox
        border={true}
        pad='small'
        margin='small'
      >
        <Heading as="h3">Experiment 2</Heading>
        <ConstrainedParagraph>
          How does this look like with more galaxies in the cluster?
        </ConstrainedParagraph>
        <ClusterViewer1
          mainSubjectId={61511507}
          subjects={subjects}
          cluster={clusters['subject_id=61511507']}
        />
      </ConstrainedBox>

    </Box>
  )
}

export { ExperimentsPage }
export default ExperimentsPage
