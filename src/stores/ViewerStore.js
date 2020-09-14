import { types } from 'mobx-state-tree'

const ViewerStore = types.model('ViewerStore', {
  page: types.optional(types.number, 0),
  panX: types.optional(types.number, 0),
  panX: types.optional(types.number, 0),
  zoom: types.optional(types.number, 1),
}).actions(self => ({
  reset() {
    self.page = 0
    self.panX = 0
    self.panY = 0
    self.zoom = 1
  },
}))

export { ViewerStore }
