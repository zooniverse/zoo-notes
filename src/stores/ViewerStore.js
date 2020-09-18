import { types } from 'mobx-state-tree'

const MIN_ZOOM = 0.2
const MAX_ZOOM = 5.0

const ViewerStore = types.model('ViewerStore', {
  page: types.optional(types.number, 0),
  imageWidth: types.optional(types.number, 0),
  imageHeight: types.optional(types.number, 0),
  viewerWidth: types.optional(types.number, 0),
  viewerHeight: types.optional(types.number, 0),
  panX: types.optional(types.number, 0),
  panY: types.optional(types.number, 0),
  showExtracts: types.optional(types.boolean, true),
  showReductions: types.optional(types.boolean, true),
  zoom: types.optional(types.number, 1),
}).actions(self => ({
  reset () {
    self.page = 0
    self.panX = 0
    self.panY = 0
    self.zoom = 1
  },
  
  resetView () {
    let bestFit = 1;
    if (self.imageWidth && self.imageHeight && self.viewerWidth && self.viewerHeight) {
      bestFit = Math.min(
        self.viewerWidth / self.imageWidth,
        self.viewerHeight / self.imageHeight
      )
    }
    
    self.panX = 0
    self.panY = 0
    self.zoom = Math.max(Math.min(bestFit, MAX_ZOOM), MIN_ZOOM)
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
  
  setImageSize ({ width, height }) {
    self.imageWidth = width
    self.imageHeight = height
  },
  
  setViewerSize ({ width, height }) {
    self.viewerWidth = width
    self.viewerHeight = height
  },
  
  setShowExtracts (bool) {
    self.showExtracts = bool
  },
  
  setShowReductions (bool) {
    self.showReductions = bool
  },
}))

export { ViewerStore }
