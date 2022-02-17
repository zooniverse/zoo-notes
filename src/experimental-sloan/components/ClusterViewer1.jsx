import { Box, NameValueList, NameValuePair, Text } from 'grommet'
import styled from 'styled-components'

const SVG = styled('svg')`
  border: 1px solid rgba(128, 128, 128, 0.5);
  max-width: 600px;
`

const STYLES = {
  AXIS: {
    STROKE: 'rgba(128, 128, 128, 0.5)'
  },
  CELL: {
    FILL: '#cccccc',
    STROKE: '#444444',
    STROKE_WIDTH: 5,
  }
}

function ClusterViewer1 ({
  mainSubjectId = '',
  subjects = {},
  cluster = {},
  width = 600,
  height = 600,
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

        <Cell
          subject={subjects[mainSubjectId]}
          cx={0} cy={0}
        />
      </SVG>
    </Box>
  )
}

function Cell ({
  subject = {},
  size = 100,
  cx = 0,
  cy = 0,
}) {
  const subjectId = subject.id
  const imageUrl = subject.locations[0]['image/jpeg']

  // TODO: determine Subject Image Size

  return (
    <g>
      <mask id={`cell-subject-id-${subjectId}`}>
        <circle cx={cx} cy={cy} r={size/2} fill='#fff'/>
      </mask>
      <circle
        cx={cx} cy={cy} r={size/2}
        fill={STYLES.CELL.FILL} stroke={STYLES.CELL.STROKE} strokeWidth={STYLES.CELL.STROKE_WIDTH}
      />
      <image
        xlinkHref={imageUrl}
        mask={`url(#cell-subject-id-${subjectId})`}
        width={size}
        height={size}
        x={-size/2}
        y={-size/2}
      />
    </g>

  )
}

export { ClusterViewer1 }
export default ClusterViewer1
