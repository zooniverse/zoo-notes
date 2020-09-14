import { types } from 'mobx-state-tree'

const MIN_ZOOM = 0.2
const MAX_ZOOM = 5.0

const ViewerStore = types.model('ViewerStore', {
  page: types.optional(types.number, 0),
  panX: types.optional(types.number, 0),
  panY: types.optional(types.number, 0),
  zoom: types.optional(types.number, 1),
}).actions(self => ({
  reset () {
    self.page = 0
    self.panX = 0
    self.panY = 0
    self.zoom = 1
  },
  
  setPan ({ x, y }, useDifference = false) {
    if (useDifference) {
      self.panX += x
      self.panY += y
    } else {
      self.panX = x
      self.panY = y
    }
  },
  
  setZoom (zoom, useDifference = false) {
    let newZoom = self.zoom
    if (useDifference) {
      newZoom += zoom
    } else {
      newZoom = zoom
    }
    self.zoom = Math.max(Math.min(newZoom, MAX_ZOOM), MIN_ZOOM)
  },
                    
  setPage (page) {
    self.page = page
  },
}))

export { ViewerStore }
