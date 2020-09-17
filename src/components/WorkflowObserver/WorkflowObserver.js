import React from 'react'
import styled from 'styled-components'
import { Box } from 'grommet'
import PropTypes from 'prop-types'

import Pusher from 'pusher-js';

let pusher = null
let channel = null
const ZOONIVERSE_PUSHER_APP_KEY = '79e8e05ea522377ba6db'

const WorkflowObserver = function ({
  workflowId
}) {
  function handleClassification (data) {
    if (!data) return
    
    // if (data.workflow_id != workflowId) return  // Use loose comparison since we might be dealing with strings or numbers
    
    const subjectId = data.subject_ids && data.subject_ids[0]
    
    console.log(subjectId)
    
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
      {workflowId}
    </Box>
  )
}

WorkflowObserver.propTypes = {
}

WorkflowObserver.defaultProps = {
}

export default WorkflowObserver
