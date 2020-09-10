import React from 'react'
import { Box } from 'grommet'
import { observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import AppContext from 'stores'

function HomePage () {
  const store = React.useContext(AppContext)
  
  React.useEffect(() => {
    return () => {}
  })
  
  return (
    <Box>
      <h1>Home</h1>
    </Box>
  )
}

export { HomePage }
export default withRouter(observer(HomePage))
