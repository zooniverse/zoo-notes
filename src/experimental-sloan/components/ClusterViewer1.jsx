import { Box, NameValueList, NameValuePair, Text } from 'grommet'
import styled from 'styled-components'

const DEFAULT_SIZE = 500

const SVG = styled('svg')`
  border: 1px solid rgba(128, 128, 128, 0.5);
  max-width: ${DEFAULT_SIZE}px;
`

const STYLES = {
  AXIS: {
    STROKE: 'rgba(128, 128, 128, 0.5)'
  },
  CELL: {
    FILL: '#cccccc',
    STROKE: '#444444',
    STROKE_WIDTH: 5,
  },
  MAIN_CELL: {
    STROKE: '#44cccc',
  }
}

const CELL_SIZE = 100

function ClusterViewer1 ({
  mainSubjectId = '',
  subjects = {},
  cluster = {},
  width = DEFAULT_SIZE,
  height = DEFAULT_SIZE,
}) {
  if (!mainSubjectId || !subjects[mainSubjectId]) return null

  const subjectsInCluster = Object.values(subjects).filter(sbj => cluster.subject_ids.includes(parseInt(sbj.id)))

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
        <g>
          <line x1={-width/2} y1={0} x2={width/2} y2={0} stroke={STYLES.AXIS.STROKE} />
          <line y1={-width/2} x1={0} y2={width/2} x2={0} stroke={STYLES.AXIS.STROKE} />
        </g>

        {subjectsInCluster.map((subject, index) => {  /* Place Subjects in the cluster around the main cell*/
          const dist = CELL_SIZE
          const angle = index / subjectsInCluster.length * 2 * Math.PI - 0.5 * Math.PI
          const cx = dist * Math.cos(angle)
          const cy = dist * Math.sin(angle)
          return (
            <Cell
              subject={subject}
              cx={cx} cy={cy} size={CELL_SIZE}
            />
          )
        })}

        <Cell  /* Main cell is in the centre */
          subject={subjects[mainSubjectId]}
          cx={0} cy={0} size={CELL_SIZE}
          type='main'
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
  type = '',
}) {
  const subjectId = subject.id
  const imageUrl = subject.locations[0]['image/jpeg']

  // TODO: determine Subject Image Size

  return (
    <g transform={`translate(${cx} ${cy})`}>
      <mask id={`cell-subject-id-${subjectId}`}>
        <circle cx={0} cy={0} r={size/2} fill='#fff'/>
      </mask>
      <circle
        cx={0} cy={0} r={size/2}
        fill={STYLES.CELL.FILL}
        stroke={(type === 'main') ? STYLES.MAIN_CELL.STROKE : STYLES.CELL.STROKE}
        strokeWidth={STYLES.CELL.STROKE_WIDTH}
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
