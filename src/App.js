import React from 'react';

import logo from './logo.svg';
import './App.css';

import { Router, Route } from 'react-router-dom'
import { Grommet } from 'grommet'
import { observer } from 'mobx-react'
import apiClient from 'panoptes-client/lib/api-client'
import auth from 'panoptes-client/lib/auth'

import { mergedTheme } from './theme'
import AppContext from './stores'
import history from './history'

import MainLayout from './pages/MainLayout'
import HomePage from './pages/HomePage'
import SubjectPage from './pages/SubjectPage'
import WorkflowPage from './pages/WorkflowPage'

/*
function checkToken(store) {
  return auth.checkBearerToken().then((token) => {
    store.client.setBearerToken(token)
  })
}
*/

function App() {
  const store = React.useContext(AppContext)

  React.useEffect(() => {
    store.initialise()
    // apiClient.beforeEveryRequest = () => checkToken(store)
  }, [store])

  if (!store.initialised) return null;

  return (
    <Router history={history}>
      <main>
        <Grommet theme={mergedTheme}>
          <MainLayout>
            <Route
              exact path='/'
              component={HomePage}
            />
            <Route
              exact path='/view/workflow/:workflowId/subject/:subjectId'
              component={SubjectPage}
            />
            <Route
              exact path='/view/workflow/:workflowId'
              component={WorkflowPage}
            />
            <Route
              exact path='/view'
              component={WorkflowPage}
            />
          </MainLayout>
        </Grommet>
      </main>
    </Router>
  );
}

export { App }
export default observer(App)
