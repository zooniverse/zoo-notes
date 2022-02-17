import { Box } from 'grommet'

function ClusterViewer1 ({
  mainSubjectId = '',
  subjects = {},
  cluster = {},
}) {
  if (!mainSubjectId || !subjects[mainSubjectId]) return null

  return (
    <Box>
      ...
    </Box>
  )
}

export { ClusterViewer1 }
export default ClusterViewer1
