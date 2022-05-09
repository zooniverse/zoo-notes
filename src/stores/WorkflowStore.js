import { flow, types } from 'mobx-state-tree'
import { panoptes } from '@zooniverse/panoptes-js'
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
  taskId: types.optional(types.string, ''), // Currently selected Task ID of the Workflow
}).views(self => ({
  get tasks () {
    return (self.current && self.current.tasks) || {}
  },
  
  get selectedTask () {
    return (self.current && self.current.tasks && self.current.tasks[self.taskId]) || {}
  },
  
  get selectedTaskType () {
    return self.selectedTask.type
  },
  
  get selectedTaskIndex () {
    return Object.keys(self.tasks).findIndex((key) => key === self.taskId)
  },
})).actions(self => ({
  reset () {
    self.taskId = ''
  },
  
  setTaskId (taskId) {
    self.taskId = taskId
  },
  
  fetchWorkflow: flow (function * fetchWorkflow (id) {
    self.asyncState = ASYNC_STATES.LOADING
    try {
      const { body } = yield panoptes.get(`/workflows/${id}`)
      const [workflow] = body.workflows
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
        self.setTaskId(workflow.first_task || '')
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
