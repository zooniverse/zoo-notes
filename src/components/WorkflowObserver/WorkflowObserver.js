import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Anchor, Box, Button, Card, CardHeader, CardBody, Image, Text } from 'grommet'
import { Clear as ClearIcon } from 'grommet-icons'
import PropTypes from 'prop-types'
import { config, env } from 'config'
import Pusher from 'pusher-js'

import LargeMessageBox from 'components/LargeMessageBox'
import { saveToLocalStorage, loadFromLocalStorage, deleteFromLocalStorage } from 'helpers/localStorage'

const StyledAnchor = styled(Anchor)`
  text-decoration: none;
`

let pusher = null
let channel = null
const ZOONIVERSE_PUSHER_CHANNEL = 'panoptes'
const MAX_SUBJECTS = 50
const STORAGE_KEY_PREFIX = 'observed-subjects'

function getKey (workflowId) {
  return (workflowId)
    ? `${STORAGE_KEY_PREFIX}-${env}-workflow-${workflowId}`
    : `${STORAGE_KEY_PREFIX}-${env}-all`
}

const WorkflowObserver = function ({
  workflowId
}) {
  const initialSubjects = loadFromLocalStorage(getKey(workflowId)) || []
  const [recentSubjects, setRecentSubjects] = useState(initialSubjects)
  
  function handleClassification (data) {
    if (!data) return
    
    if (workflowId && parseInt(data.workflow_id) !== parseInt(workflowId)) return
    
    const subjectId = data.subject_ids && data.subject_ids[0]
    if (!subjectId) return
    
    const userId = data.user_id
    let previewUrl = undefined
    if (data.subject_urls && data.subject_urls[0]) {
      Object.keys(data.subject_urls[0]).forEach(type => {
        if (type === 'image/jpeg' || type === 'image/png' || type === 'image/gif') {
          previewUrl = data.subject_urls[0][type]
          previewUrl = previewUrl.replace('https://', '')
          previewUrl = previewUrl.replace('http://', '')
          previewUrl = previewUrl.replace('static.zooniverse.org/', '')
          previewUrl = `https://thumbnails.zooniverse.org/200x200/${previewUrl}`
        }
      })
    }
    
    let recents = recentSubjects.slice()
    const existingIndex = recents.findIndex(subject => subjectId === subject.id)
    if (existingIndex >= 0) recents.splice(existingIndex, 1)
    
    recents.unshift({
      id: subjectId,
      preview: previewUrl,
      userId: userId,
      workflowId: data.workflow_id,
    })
    recents = recents.slice(0, Math.min(recents.length, MAX_SUBJECTS))
    
    setRecentSubjects(recents)
    saveToLocalStorage(getKey(workflowId), recents)
  }
  
  function clearRecentSubjects () {
    deleteFromLocalStorage(getKey(workflowId))
    setRecentSubjects([])
  }
  
  useEffect(() => {
    if (!pusher) {
      pusher = new Pusher(config.pusherAppKey)
    }
    channel = pusher.subscribe(ZOONIVERSE_PUSHER_CHANNEL)
    
    channel.bind('classification', handleClassification)
    
    return () => {
      channel.unbind()
      channel = null
      pusher.subscribe('panoptes')
    }
  })
  
  if (recentSubjects.length === 0) {
    return (
      <LargeMessageBox>
        <Text>No Classifications yet.</Text>
      </LargeMessageBox>
    )
  }
  
  return (
    <>
      <Box direction='row' align='center' pad='small' gap='small'>
        <Text>
          Showing <b>{recentSubjects.length}</b> of the most recently classified Subject(s). (Maximum of {MAX_SUBJECTS})
        </Text>
        <Button
          icon={<ClearIcon color='light-5' size='small' />}
          gap='xsmall'
          label={<Text size='xsmall' color='light-5'>Clear</Text>}
          onClick={clearRecentSubjects}
          plain={true}
          size='small'
        />
      </Box>
      <Box wrap={true} direction='row'>
        {recentSubjects.map((subject, index) => (
          <StyledAnchor
            key={`subject-${subject.id}`}
            href={`/view/workflow/${(workflowId || subject.workflowId)}/subject/${subject.id}`}
            target='_blank'
          >
            <Card margin="0.5em">
              <CardHeader margin="0.5em">{subject.id}</CardHeader>
              <CardBody background="#e5e5e5">
                <Box width="200px" height="200px">
                {subject.preview &&
                  <Image src={subject.preview} />
                }
                </Box>
                {(!workflowId) &&
                  <Text margin={{ vertical: 'none', horizontal: 'small' }}>from workflow {subject.workflowId}</Text>
                }
              </CardBody>
            </Card>
          </StyledAnchor>
        ))}
      </Box>
    </>
  )
}

WorkflowObserver.propTypes = {
  workflowId: PropTypes.string,
}

WorkflowObserver.defaultProps = {
}

export default WorkflowObserver
