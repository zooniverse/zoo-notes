import React, { useContext } from 'react';
import './App.css';

import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Grommet } from 'grommet'
import { observer } from 'mobx-react'
// import apiClient from 'panoptes-client/lib/api-client'
// import auth from 'panoptes-client/lib/auth'

import { mergedTheme } from './theme'
import AppContext from './stores'

import MainLayout from './pages/MainLayout'
import HomePage from './pages/HomePage'
import SubjectPage from './pages/SubjectPage'
import WorkflowPage from './pages/WorkflowPage'
import ExperimentsPage from './experimental-sloan/pages/ExperimentsPage'

/*
function checkToken(store) {
  return auth.checkBearerToken().then((token) => {
    store.client.setBearerToken(token)
  })
}
*/

function App() {
  const store = useContext(AppContext)

  React.useEffect(() => {
    store.initialise()
    // apiClient.beforeEveryRequest = () => checkToken(store)
  }, [store])

  if (!store.initialised) return null;

  return (
    <BrowserRouter>
      <main>
        <Grommet theme={mergedTheme}>
          <MainLayout>
            <Switch>
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
              <Route
                exact path='/experimental'
                component={ExperimentsPage}
              />
            </Switch>
          </MainLayout>
        </Grommet>
      </main>
    </BrowserRouter>
  );
}

export { App }
export default observer(App)
