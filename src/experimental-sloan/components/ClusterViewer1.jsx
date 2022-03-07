import { useState } from 'react'
import { Box, Button, NameValueList, NameValuePair, Text } from 'grommet'
import { FormClose } from 'grommet-icons'
import styled from 'styled-components'
import stopEvent from '../helpers/stopEvent'

const DEFAULT_SIZE = 500

const Container = styled(Box)`
  box-shadow: 0.1rem 0.1rem 0.25rem #444;
  border-radius: 1rem;
`

const SVG = styled('svg')`
  border: 1px solid rgba(128, 128, 128, 0.5);
  max-width: ${DEFAULT_SIZE}px;
  background: #222222;
`

const SelectableCircle = styled('circle')`
  cursor: pointer;
`

const SelectableImage = styled('image')`
  cursor: pointer;
`

const STYLES = {
  AXIS: {
    STROKE: 'rgba(255, 255, 255, 0.5)'
  },
  CELL: {
    FILL: '#cccccc',
    STROKE: '#444444',
    STROKE_WIDTH: 5,
  },
  MAIN_CELL: {
    STROKE: '#44cccc',
  },
  SELECTED_CELL: {
    STROKE: '#00ffff',
    STROKE_WIDTH: 10,
  },
}

const CELL_SIZE = 100
const DISTANCE_BETWEEN_CELLS = 110

function ClusterViewer1 ({
  mainSubjectId = '',
  subjects = {},
  cluster = {},
  width = DEFAULT_SIZE,
  height = DEFAULT_SIZE,
}) {
  const [selectedSubject, setSelectedSubject] = useState(undefined)

  const subjectsInCluster = Object.values(subjects).filter(sbj => cluster.subject_ids.includes(parseInt(sbj.id)))

  const selectSubject = (subjectId) => {
    const selectedSubject = Object.values(subjects).find(sbj => sbj.id === subjectId)
    setSelectedSubject(selectedSubject)
  }

  const closeSubjectInspector = () => { selectSubject(undefined) }

  return (
    <Container
      border={true}
      pad='medium'
      margin='small'
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
          const dist = DISTANCE_BETWEEN_CELLS
          const angle = index / subjectsInCluster.length * 2 * Math.PI - 0.5 * Math.PI
          const cx = dist * Math.cos(angle)
          const cy = dist * Math.sin(angle)
          return (
            <Cell
              key={subject.id}
              subject={subject}
              cx={cx} cy={cy} size={CELL_SIZE}
              isSelected={subject.id === selectedSubject?.id}
              onSelect={selectSubject}
            />
          )
        })}

        {mainSubjectId && (
          <Cell  /* Main cell is in the centre */
            subject={subjects[mainSubjectId]}
            cx={0} cy={0} size={CELL_SIZE}
            isSelected={mainSubjectId === selectedSubject?.id}
            onSelect={selectSubject}
            type='main'
          />
        )}
      </SVG>
      <SubjectInspector
        subject={selectedSubject}
        onClose={closeSubjectInspector}
      />
      <Text size='small'>ClusterViewer v1</Text>
    </Container>
  )
}

function Cell ({
  subject = {},
  size = 100,
  cx = 0,
  cy = 0,
  isSelected = false,
  onSelect = () => {},
  type = '',
}) {
  const subjectId = subject.id
  const imageUrl = subject.locations[0]['image/jpeg']

  // TODO: determine Subject Image Size

  const onClick = (e) => {
    onSelect(subjectId)
    stopEvent(e)
  }

  const onKeyPress = (e) => {
    if (e?.key === 'Enter') {
      onSelect(subjectId)
      stopEvent(e)
    }
  }

  let stroke = STYLES.CELL.STROKE
  if (type === 'main') stroke = STYLES.MAIN_CELL.STROKE
  if (isSelected) stroke = STYLES.SELECTED_CELL.STROKE

  const strokeWidth = (isSelected)
    ? STYLES.SELECTED_CELL.STROKE_WIDTH
    : STYLES.CELL.STROKE_WIDTH

  return (
    <g
      transform={`translate(${cx} ${cy})`}
      tabIndex='0'
      onClick={onClick}
      onKeyPress={onKeyPress}
    >
      <mask id={`cell-subject-id-${subjectId}`}>
        <circle
          cx={0} cy={0} r={size/2}
          fill='#fff'
          strokeWidth={strokeWidth}
        />
      </mask>
      <SelectableCircle
        cx={0} cy={0} r={size/2}
        fill={STYLES.CELL.FILL}
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
      <SelectableImage
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

function SubjectInspector ({
  subject,
  onClose,
}) {
  if (!subject) {
    return (
      <Box>
        <Text>Click on a Subject to inspect it.</Text>
      </Box>
    )
  }

  const metadata = (!subject.metadata)
    ? []
    : Object.keys(subject.metadata).map(key => {
      return {
        key,
        value: subject.metadata[key]
      }
    })

  return (
    <Box border={true} pad='small' margin={{ vertical: 'xsmall', horizontal: 'none' }}>
      <Box direction='row'>
        <Box flex={true}>
          <Text weight='bold'>Subject {subject.id}</Text>
        </Box>
        <Button
          a11yTitle='Close Subject Inspector'
          icon={<FormClose />}
          onClick={onClose}
          plain={true}
        />
      </Box>
      {metadata.length === 0 && <Text>This Subject has no metadata</Text>}
      {metadata.length > 0 && (
        <NameValueList>
          {metadata.map(m => (
            <NameValuePair key={m.key} name={m.key}>
              <Text>{m.value}</Text>
            </NameValuePair>
          ))}
        </NameValueList>
      )}
    </Box>
  )

}

export { ClusterViewer1 }
export default ClusterViewer1
