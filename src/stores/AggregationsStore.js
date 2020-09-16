import { flow, types } from 'mobx-state-tree'
import { request, gql } from 'graphql-request'
import ASYNC_STATES from 'helpers/asyncStates'
import { config } from 'config'

const AggregationsStore = types.model('AggregationsStore', {
  asyncState: types.optional(types.string, ASYNC_STATES.IDLE),
  current: types.frozen({}),
  error: types.optional(types.string, ''),
}).actions(self => ({
  reset () {
    self.current = {}
  },
  
  setCurrent (data) {
    self.current = data
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
      })
      
      self.asyncState = ASYNC_STATES.READY
    } catch (error) {
      console.error(error)
      self.error = error.message
      self.current = undefined
      self.asyncState = ASYNC_STATES.ERROR
    }
  }),

}))

export { AggregationsStore }
