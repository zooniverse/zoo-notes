import React from 'react'
import styled from 'styled-components'
import { Anchor, Box, Text } from 'grommet'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import Pusher from 'pusher-js';

let pusher = null
let channel = null
const ZOONIVERSE_PUSHER_APP_KEY = '79e8e05ea522377ba6db'
const MAX_SUBJECTS = 10

const WorkflowObserver = function ({
  workflowId
}) {
  const [recentSubjects, setRecentSubjects] = React.useState([])
  
  
  function handleClassification (data) {
    console.log('+++ data ', data)
    if (!data) return
    
    // if (data.workflow_id != workflowId) return  // Use loose comparison since we might be dealing with strings or numbers
    
    const subjectId = data.subject_ids && data.subject_ids[0]
    if (!subjectId) return
    
    const userId = data.user_id
    
    const recents = recentSubjects.slice()
    const existingIndex = recents.indexOf(subjectId)
    if (existingIndex >= 0) recents.splice(existingIndex, 1)
    
    recents.unshift(subjectId)
    
    setRecentSubjects(recents.slice(0, Math.min(recents.length, MAX_SUBJECTS)))
    
  }
  
  React.useEffect(() => {
    if (!pusher) {
      pusher = new Pusher(ZOONIVERSE_PUSHER_APP_KEY)
    }
    channel = pusher.subscribe('panoptes')
    
    channel.bind('classification', handleClassification)
    
    return () => {
      channel.unbind()
      channel = null
      pusher.subscribe('panoptes')
    }
  })

  return (
    <Box>
      <ul>
        {recentSubjects.map(subjectId => (
          <li key={`subject-${subjectId}`}>
            <Anchor href={`/view/workflow/${workflowId}/subject/${subjectId}`}>
              <Text>{subjectId}</Text>
            </Anchor>
          </li>
        ))}
      </ul>
    </Box>
  )
}

WorkflowObserver.propTypes = {
}

WorkflowObserver.defaultProps = {
}

export default WorkflowObserver
