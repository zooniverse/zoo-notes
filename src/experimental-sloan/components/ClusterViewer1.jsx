import { Box, NameValueList, NameValuePair, Text } from 'grommet'
import styled from 'styled-components'

const SVG = styled('svg')`
  border: 1px solid rgba(128, 128, 128, 0.5);
  max-width: 100%;
`

const STYLES = {
  AXIS: {
    STROKE: 'rgba(128, 128, 128, 0.5)'
  },
}

const CELL_SIZE = 200

function ClusterViewer1 ({
  mainSubjectId = '',
  subjects = {},
  cluster = {},
  width = 1000,
  height = 1000,
}) {
  if (!mainSubjectId || !subjects[mainSubjectId]) return null

  return (
    <Box
      border={true}
      pad='medium'
    >
      <NameValueList>
        <NameValuePair name='num_selected'>
          <Text>{cluster['num_selected']}</Text>
        </NameValuePair>
        <NameValuePair name='cluster_size'>
          <Text>{cluster['cluster_size']}</Text>
        </NameValuePair>
        <NameValuePair name='total_subjects'>
          <Text>{cluster['total_subjects']}</Text>
        </NameValuePair>
      </NameValueList>
      <SVG
        viewBox={`${-width/2} ${-height/2} ${width} ${height}`}
      >
        <line x1={-width/2} y1={0} x2={width/2} y2={0} stroke={STYLES.AXIS.STROKE} />
        <line y1={-width/2} x1={0} y2={width/2} x2={0} stroke={STYLES.AXIS.STROKE} />
      </SVG>
    </Box>
  )
}

export { ClusterViewer1 }
export default ClusterViewer1
