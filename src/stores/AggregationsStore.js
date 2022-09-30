import { applySnapshot, getRoot, types } from 'mobx-state-tree'
import ASYNC_STATES from 'helpers/asyncStates'

const Point = types.model('Point', {
  x: types.number,
  y: types.number,
})

const AggregationStats = types.model('AggregationStats', {
  numClassifications: types.optional(types.number, 0),
  numExtractPoints: types.optional(types.number, 0),
  numReductionPoints: types.optional(types.number, 0),
})

const AggregationsStore = types.model('AggregationsStore', {
  asyncState: types.optional(types.string, ASYNC_STATES.IDLE),
  current: types.frozen({}),
  extracts: types.array(Point),
  reductions: types.array(Point),
  stats: types.optional(AggregationStats, () => AggregationStats.create({})),
  error: types.optional(types.string, ''),
}).actions(self => ({
  reset () {
    self.current = {}
    self.extracts = []
    self.reductions = []
  },

  setCurrent (data) {
    self.current = data
  },

  extractData () {
    const store = getRoot(self)
    const workflow = store.workflow.current

    try {
      if (!workflow) return  // ERROR

      const selectedTaskType = store.workflow.selectedTaskType
      const taskId = store.workflow.taskId
      const page = store.subject.page

      const extractData = self[`extractData_${selectedTaskType}`]
      extractData?.(taskId, page, 0)
    } catch (error) {
      console.error('ERROR in AggregationsStore.extractData():', error)
    }

  },

  extractData_single (taskId = 'T0') {
    try {
      const wf = self.current.workflow
      const numClassifications = wf.extracts?.length || 0
      applySnapshot(self.stats, { numClassifications })
    } catch (error) {
      console.error(error)
      applySnapshot(self.stats, { numClassifications: 0 })
    }
  },

  extractData_drawing (taskId = 'T0', page = 0, toolId = '0') {
    let numClassifications = 0

    try {
      const wf = self.current.workflow

      const extracts = []
      wf.extracts.forEach(classification => {
        numClassifications++
        const frame = classification.data[`frame${page}`]
        if (!frame) return
        const xs = frame[`${taskId}_tool${toolId}_x`] || []
        const ys = frame[`${taskId}_tool${toolId}_y`] || []

        for (let i = 0; i < xs.length && i < ys.length; i++) {
          extracts.push({
            x: xs[i],
            y: ys[i],
          })
        }
      })

      const reductions = []
      wf.reductions.forEach(classification => {
        const frame = classification.data[`frame${page}`]
        if (!frame) return
        const xs = frame[`${taskId}_tool${toolId}_clusters_x`] || []
        const ys = frame[`${taskId}_tool${toolId}_clusters_y`] || []

        for (let i = 0; i < xs.length && i < ys.length; i++) {
          reductions.push({
            x: xs[i],
            y: ys[i],
          })
        }
      })

      applySnapshot(self.extracts, extracts)
      applySnapshot(self.reductions, reductions)
      applySnapshot(self.stats, {
        numClassifications,
        numExtractPoints: extracts.length,
        numReductionPoints: reductions.length,
      })
    } catch (error) {
      console.error(error)
      applySnapshot(self.extracts, [])
      applySnapshot(self.reductions, [])
      applySnapshot(self.stats, {
        numClassifications: 0,
        numExtractPoints: 0,
        numReductionPoints: 0,
      })
    }
  },

}))

export { AggregationsStore }
