import { types } from 'mobx-state-tree'
import ASYNC_STATES from 'helpers/asyncStates'

const Subject = types.model('Subject', {
  id: types.optional(types.string, ''),
  locations: types.array(types.frozen({})),
  metadata: types.frozen({}),
})

const SubjectStore = types.model('SubjectStore', {
  asyncState: types.optional(types.string, ASYNC_STATES.IDLE),
  current: types.optional(Subject, {}),
  error: types.optional(types.string, ''),
  page: types.optional(types.number, 0),  // Currently selected 'frame' of the Subject
}).views(self => ({
  get locations () {
    return (self.current && self.current.locations) || []
  }
})).actions(self => ({
  reset () {
    self.page = 0
  },
  
  setPage (page) {
    self.page = page
  }
}))

export { Subject, SubjectStore }
