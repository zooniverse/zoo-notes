import { flow, types } from 'mobx-state-tree'
import { AuthStore } from './AuthStore'

const AppStore = types.model('AppStore', {
  auth: types.optional(AuthStore, () => AuthStore.create({})),
  // auth: AuthStore.create({}),
  initialised: types.optional(types.boolean, false),
}).actions(self => {
  const getResources = flow (function * getResources(params) {
    // TODO
  })

  const initialise = flow (function * initialise() {
    yield self.auth.checkCurrent()
    self.initialised = true
  })

  return {
    getResources,
    initialise
  }
})

export { AppStore }
