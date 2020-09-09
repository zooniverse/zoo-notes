import React from 'react'
import { Box } from 'grommet'
import { observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import AppContext from '../store'

function ViewPage ({ match }) {
  const store = React.useContext(AppContext)
  const workflowId = match.params.workflowId
  const subjectId = match.params.subjectId
  
  
  React.useEffect(() => {
    return () => {}
  }, [workflowId, subjectId])
  
  return (
    <Box>
      <h1>Viewing</h1>
      <h2>Workflow: {workflowId}</h2>
      <h2>Subject: {subjectId}</h2>
    </Box>
  )
}

export { ViewPage }
export default withRouter(observer(ViewPage))
