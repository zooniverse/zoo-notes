import { useContext } from 'react'
import { Box, Heading, Text } from 'grommet'
import { observer } from 'mobx-react'
import { useParams } from 'react-router'
import styled from 'styled-components'

import AggregationsViewer from 'components/AggregationsViewer'
import SubjectViewer from 'components/SubjectViewer'
import { useCaesar, useSubject, useWorkflow } from 'hooks'
import AppContext from 'stores'

const OverflowBox = styled(Box)`
  overflow: auto;
`

function SubjectPage () {
  const store = useContext(AppContext)
  const { subjectId, workflowId } = useParams()
  const subject = useSubject(subjectId)
  const workflow = useWorkflow(workflowId)
  useCaesar(subject.id, workflow.id)
  
  return (
    <Box>
      <Heading as='h2' size='xsmall'>Viewing Subject</Heading>
      <Text>
        Subject: {subjectId} ({store.subject.asyncState})
        &nbsp;|&nbsp;
        Workflow: {workflowId} ({store.workflow.asyncState}) {store.workflow.current && store.workflow.current.display_name}
      </Text>
      <OverflowBox direction='row' gap='xsmall'>
        <SubjectViewer />
        <AggregationsViewer />
      </OverflowBox>
    </Box>
  )
}

export { SubjectPage }
export default observer(SubjectPage)
