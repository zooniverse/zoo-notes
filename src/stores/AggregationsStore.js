import { flow, types } from 'mobx-state-tree'
import { request, gql } from 'graphql-request'
import ASYNC_STATES from 'helpers/asyncStates'
import { config } from 'config'

const Point = types.model('Point', {
  x: types.number,
  y: types.number,
})

const AggregationStats = types.model('AggregationStats', {
  numClassifications: types.optional(types.number, -1),
  numExtractPoints: types.optional(types.number, -1),
  numReductionPoints: types.optional(types.number, -1),
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
  
  setExtracts (data) {
    self.extracts = data
  },
  
  setReductions (data) {
    self.reductions = data
  },
  
  setStats ({ numClassifications, numExtractPoints, numReductionPoints }) {
    self.stats.numClassifications = numClassifications || 0
    self.stats.numExtractPoints = numExtractPoints || 0
    self.stats.numReductionPoints = numReductionPoints || 0
  },
  
  fetchAggregations: flow (function * fetchAggregations (workflowId, subjectId) {
    self.asyncState = ASYNC_STATES.LOADING
    try {
      const query = gql`{
        workflow(id: ${workflowId}) {
          reductions(subjectId: ${subjectId}) {
            data
          }
          extracts(subjectId: ${subjectId}) {
            data
          }
        }
      }`
      
      yield request(config.caesar, query).then((data) => {
        self.setCurrent(data)
        self.extractData(0)
      })
      
      self.asyncState = ASYNC_STATES.READY
    } catch (error) {
      console.error(error)
      self.error = error.message
      self.current = undefined
      self.asyncState = ASYNC_STATES.ERROR
    }
  }),
  
  extractData (page = 0, taskId = 'T0', toolId = '0') {
    let numClassifications = 0
    
    try {
      const wf = self.current.workflow
      
      const extracts = []
      wf.extracts.forEach(classification => {
        numClassifications++
        const frame = classification.data[`frame${page}`]
        if (!frame) return
        const xs = frame[`${taskId}_tool${toolId}_x`]
        const ys = frame[`${taskId}_tool${toolId}_y`]
        
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
        const xs = frame[`${taskId}_tool${toolId}_clusters_x`]
        const ys = frame[`${taskId}_tool${toolId}_clusters_y`]
        
        for (let i = 0; i < xs.length && i < ys.length; i++) {
          reductions.push({
            x: xs[i],
            y: ys[i],
          })
        }
      })

      self.setExtracts(extracts)
      self.setReductions(reductions)
      self.setStats ({
        numClassifications: numClassifications,
        numExtractPoints: extracts.length,
        numReductionPoints: reductions.length,
      })
    } catch (err) {
      console.warn(err)
      self.setExtracts([])
      self.setReductions([])
      self.setStats ({
        numClassifications: -1,
        numExtractPoints: -1,
        numReductionPoints: -1,
      })
    }
  }

}))

export { AggregationsStore }
