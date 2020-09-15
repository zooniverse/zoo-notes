import { flow, types } from 'mobx-state-tree'
import { AggregationsStore } from './AggregationsStore'
import { AuthStore } from './AuthStore'
import { ImageStore } from './ImageStore'
import { SubjectStore } from './SubjectStore'
import { ViewerStore } from './ViewerStore'
import { WorkflowStore } from './WorkflowStore'

const AppStore = types.model('AppStore', {
  initialised: types.optional(types.boolean, false),
  aggregations: types.optional(AggregationsStore, () => AggregationsStore.create({})),
  auth: types.optional(AuthStore, () => AuthStore.create({})),
  image: types.optional(ImageStore, () => ImageStore.create({})),
  subject: types.optional(SubjectStore, () => SubjectStore.create({})),
  viewer: types.optional(ViewerStore, () => ViewerStore.create({})),
  workflow: types.optional(WorkflowStore, () => WorkflowStore.create({})),
}).actions(self => {
  const initialise = flow (function * initialise() {
    yield self.auth.checkCurrent()
    self.initialised = true
  })

  return {
    initialise
  }
})

export { AppStore }
