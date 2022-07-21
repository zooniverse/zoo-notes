import { autorun } from 'mobx'
import { addDisposer, types } from 'mobx-state-tree'
import ASYNC_STATES from 'helpers/asyncStates'
import { AggregationsStore } from './AggregationsStore'
import { ImageStore } from './ImageStore'
import { SubjectStore } from './SubjectStore'
import { ViewerStore } from './ViewerStore'
import { WorkflowStore } from './WorkflowStore'

const AppStore = types.model('AppStore', {
  aggregations: types.optional(AggregationsStore, () => AggregationsStore.create({})),
  image: types.optional(ImageStore, () => ImageStore.create({})),
  subject: types.optional(SubjectStore, () => SubjectStore.create({})),
  viewer: types.optional(ViewerStore, () => ViewerStore.create({})),
  workflow: types.optional(WorkflowStore, () => WorkflowStore.create({})),
})
.views(self => ({
  get isReady() {
    return (
      self.subject.asyncState === ASYNC_STATES.READY &&
      self.workflow.asyncState === ASYNC_STATES.READY &&
      self.aggregations.asyncState === ASYNC_STATES.READY
    )
  }
}))
.actions(self => {
  function _onDataReady() {
    if (self.isReady && self.workflow.taskId) {
      self.aggregations.extractData()
    }
  }

  return {
    afterCreate() {
      const dataDisposer = autorun(_onDataReady)
      addDisposer(self, dataDisposer)
    }
  }
})

export { AppStore }
