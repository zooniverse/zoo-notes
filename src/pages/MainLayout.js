import React from 'react'
import { Box } from 'grommet'
import { withRouter } from 'react-router-dom'

function MainLayout ({ children }) {
  return (
    <>
      <Box
        pad='small'
      >
        { children }
      </Box>
    </>
  )
}

export { MainLayout }
export default withRouter(MainLayout)
