import { flow, types } from 'mobx-state-tree'
import { subjects } from '@zooniverse/panoptes-js'
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
  },
  
  fetchSubject: flow (function * fetchSubject(id) {
    self.asyncState = ASYNC_STATES.LOADING
    try {
      const { body } = yield subjects.get({ id })
      const [subject] = body.subjects
      if (subject) {
        const newSubject = Subject.create({
          id: subject.id,
          locations: subject.locations,
          metadata: subject.metadata
        })
        self.current = newSubject
        self.error = ''
      }
      self.asyncState = ASYNC_STATES.READY
      
      // Set initial page
      self.reset()
    } catch (error) {
      console.error(error)
      self.error = error.message
      self.current = undefined
      self.asyncState = ASYNC_STATES.ERROR
    }
  }),

}))

export { Subject, SubjectStore }
