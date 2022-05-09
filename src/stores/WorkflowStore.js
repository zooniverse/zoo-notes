import { types } from 'mobx-state-tree'
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
  }
}))

export { Workflow, WorkflowStore }
