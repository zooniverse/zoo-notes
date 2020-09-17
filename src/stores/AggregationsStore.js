import { flow, types } from 'mobx-state-tree'
import { request, gql } from 'graphql-request'
import ASYNC_STATES from 'helpers/asyncStates'
import { config } from 'config'

const Point = types.model('Point', {
  x: types.number,
  y: types.number,
})

const AggregationsStore = types.model('AggregationsStore', {
  asyncState: types.optional(types.string, ASYNC_STATES.IDLE),
  current: types.frozen({}),
  extracts: types.array(Point),
  reductions: types.array(Point),
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
        console.log('+++ data: ', data)
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
    try {
      const wf = self.current.workflow
      
      const extracts = []
      wf.extracts.forEach(classification => {
        const frame = classification.data[`frame${page}`]
        const xs = frame[`${taskId}_tool${toolId}_x`]
        const ys = frame[`${taskId}_tool${toolId}_x`]
        
        for (let i = 0; i < xs.length && i < ys.length; i++) {
          extracts.push({
            x: xs[i],
            y: ys[i],
          })
        }        
      })
      
      const reductions = []

      self.setExtracts(extracts)
      self.setReductions(reductions)
    } catch (err) {
      console.warn(err)
      self.setExtracts([])
      self.setReductions([])
    }
  }

}))

export { AggregationsStore }
