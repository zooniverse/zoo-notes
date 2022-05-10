import './App.css'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Grommet } from 'grommet'
import { observer } from 'mobx-react'

import { mergedTheme } from './theme'

import MainLayout from './pages/MainLayout'
import HomePage from './pages/HomePage'
import SubjectPage from './pages/SubjectPage'
import WorkflowPage from './pages/WorkflowPage'
import ExperimentsPage from './experimental-sloan/pages/ExperimentsPage'

function App() {
  return (
    <BrowserRouter>
      <main>
        <Grommet theme={mergedTheme}>
          <MainLayout>
            <Routes>
              <Route
                path='/'
                element={<HomePage />}
              />
              <Route
                path='/view/workflow/:workflowId/subject/:subjectId'
                element={<SubjectPage />}
              />
              <Route
                path='/view/workflow/:workflowId'
                element={<WorkflowPage />}
              />
              <Route
                path='/view'
                element={<WorkflowPage />}
              />
              <Route
                path='/experimental'
                element={<ExperimentsPage />}
              />
            </Routes>
          </MainLayout>
        </Grommet>
      </main>
    </BrowserRouter>
  )
}

export { App }
export default observer(App)
