import { flow, types, getRoot } from 'mobx-state-tree'
import apiClient from 'panoptes-client/lib/api-client.js'
import ASYNC_STATES from 'helpers/asyncStates'

const Workflow = types.model('Workflow', {
  display_name: types.optional(types.string, ''),
  id: types.optional(types.string, ''),
  tasks: types.frozen({}),
  metadata: types.frozen({}),
})

const WorkflowStore = types.model('WorkflowStore', {
  asyncState: types.optional(types.string, ASYNC_STATES.IDLE),
  current: types.optional(Workflow, {}),
  error: types.optional(types.string, ''),
}).actions(self => ({
  fetchWorkflow: flow (function * fetchWorkflow (id) {
    const store = getRoot(self)
    self.asyncState = ASYNC_STATES.LOADING
    try {
      const [workflow] = yield apiClient.type('workflows').get({ id })
      if (workflow) {
        const newWorkflow = Workflow.create({
          display_name: workflow.display_name,
          id: workflow.id,
          tasks: workflow.tasks,
          metadata: workflow.metadata
        })
        self.current = newWorkflow
        self.error = ''
        
        // Set the initial task
        store.viewer.setTaskId(workflow.first_task || '')
      }
      self.asyncState = ASYNC_STATES.READY
    } catch (error) {
      console.error(error)
      self.error = error.message
      self.current = undefined
      self.asyncState = ASYNC_STATES.ERROR
    }
  }),

}))

export { Workflow, WorkflowStore }
