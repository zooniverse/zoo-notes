import { autorun } from 'mobx'
import { addDisposer, types } from 'mobx-state-tree'
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
  workflow: types.optional(WorkflowStore, () => WorkflowStore.create({}))
}).actions(self => {
  function _onDataReady() {
    const workflow = self.workflow.current
    const data = self.aggregations.current
    if (data && workflow) {
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
