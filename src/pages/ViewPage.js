import React from 'react'
import { Box } from 'grommet'
import { observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import AppContext from 'stores'
import ASYNC_STATES from 'helpers/asyncStates'

import SubjectViewer from 'components/SubjectViewer'

function ViewPage ({ match }) {
  const store = React.useContext(AppContext)
  const workflowId = match.params.workflowId
  const subjectId = match.params.subjectId
  
  
  React.useEffect(() => {
    store.workflow.fetchWorkflow(workflowId)
    store.subject.fetchSubject(subjectId)
    
    return () => {}
  }, [workflowId, subjectId])
  
  return (
    <Box>
      <h1>Viewing</h1>
      <h2>Workflow: {workflowId} - {store.workflow.asyncState}</h2>
    
      {(store.workflow.asyncState === ASYNC_STATES.READY && store.workflow.current) && (
        <Box>
          <h3>{store.workflow.current.display_name}</h3>
        </Box>
      )}
    
      <h2>Subject: {subjectId} - {store.subject.asyncState}</h2>
    
      {(store.subject.asyncState === ASYNC_STATES.READY && store.subject.current) && (
        <Box>
          <h3>Locations</h3>
          <ul>
            {store.subject.current.locations.map(location => {
              console.log(Object.values(location))
              return Object.values(location).map(url => (
                <img src={url} />
              ))
            })}
          </ul>
        </Box>

      )}
      
      <SubjectViewer />
      
    </Box>
  )
}

export { ViewPage }
export default withRouter(observer(ViewPage))
