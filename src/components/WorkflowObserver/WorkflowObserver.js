import React from 'react'
import styled from 'styled-components'
import { Anchor, Box, Card, CardHeader, CardBody, Image, Text } from 'grommet'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { env } from 'config'
import Pusher from 'pusher-js'

import { mergedTheme } from 'theme'

const StyledAnchor = styled(Anchor)`
  text-decoration: none;
`

let pusher = null
let channel = null
const ZOONIVERSE_PUSHER_APP_KEY = '79e8e05ea522377ba6db'
const ZOONIVERSE_PUSHER_CHANNEL = 'panoptes'
// const ZOONIVERSE_PUSHER_CHANNEL = (env === 'staging') ? 'panoptes-staging' : 'panoptes'
const MAX_SUBJECTS = 10

const SHOW_SINGLE_WORKFLOW = false // TMP

const WorkflowObserver = function ({
  workflowId
}) {
  const [recentSubjects, setRecentSubjects] = React.useState([])
  
  function handleClassification (data) {
    if (!data) return
    
    if (workflowId && data.workflow_id != workflowId) return  // Use loose comparison since we might be dealing with strings or numbers
    
    const subjectId = data.subject_ids && data.subject_ids[0]
    if (!subjectId) return
    
    const userId = data.user_id
    let previewUrl = undefined
    if (data.subject_urls && data.subject_urls[0]) {
      Object.keys(data.subject_urls[0]).forEach(type => {
        if (type === 'image/jpeg' || type === 'image/png') {
          previewUrl = data.subject_urls[0][type]
          previewUrl = previewUrl.replace('https://', '')
          previewUrl = previewUrl.replace('http://', '')
          previewUrl = previewUrl.replace('static.zooniverse.org/', '')
          previewUrl = `https://thumbnails.zooniverse.org/200x200/${previewUrl}`
        }
      })
    }
    
    const recents = recentSubjects.slice()
    const existingIndex = recents.findIndex(subject => subjectId === subject.id)
    if (existingIndex >= 0) recents.splice(existingIndex, 1)
    
    recents.unshift({
      id: subjectId,
      preview: previewUrl,
      userId: userId,
      workflowId: data.workflow_id,
    })
    
    setRecentSubjects(recents.slice(0, Math.min(recents.length, MAX_SUBJECTS)))
  }
  
  React.useEffect(() => {
    if (!pusher) {
      pusher = new Pusher(ZOONIVERSE_PUSHER_APP_KEY)
    }
    channel = pusher.subscribe(ZOONIVERSE_PUSHER_CHANNEL)
    
    channel.bind('classification', handleClassification)
    
    return () => {
      channel.unbind()
      channel = null
      pusher.subscribe('panoptes')
    }
  })

  return (
    <Box wrap={true} direction="row">
      {recentSubjects.map((subject, index) => (
        <StyledAnchor
          key={`subject-${subject.id}`}
          href={`/view/workflow/${(workflowId || subject.workflowId)}/subject/${subject.id}`}
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
  )
}

WorkflowObserver.propTypes = {
  workflowId: PropTypes.string,
}

WorkflowObserver.defaultProps = {
}

export default WorkflowObserver