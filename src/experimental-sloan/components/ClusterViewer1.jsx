import { Box, NameValueList, NameValuePair, Text } from 'grommet'

function ClusterViewer1 ({
  mainSubjectId = '',
  subjects = {},
  cluster = {},
}) {
  if (!mainSubjectId || !subjects[mainSubjectId]) return null

  return (
    <Box>
    <NameValueList>
      <NameValuePair name="Power">
        <Text>Ok</Text>
      </NameValuePair>
      <NameValuePair name="Health">
        <Text>Critical</Text>
      </NameValuePair>
    </NameValueList>
    </Box>
  )
}

export { ClusterViewer1 }
export default ClusterViewer1
