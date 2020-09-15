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
  
  fetchAggregations: flow (function * fetchAggregations (workflowId, subjectId) {
    self.asyncState = ASYNC_STATES.LOADING
    try {
      const query = gql`{
        workflow(id: 3438) {
          reductions(subjectId: 133565) {
            data
          }
        }
      }`
      
      yield request(config.caesar, query).then((data) => {
        console.log('+++ data: ', data)
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
