import {addTaskAC, changeTaskStatusAC, removeTaskAC, taskReducer} from "./taskReducer";
import {TasksType} from "../App";

export type RemoveTaskAT = {
  type: 'REMOVE-TASK',
  todoListId: string,
  taskId: string | number
}
export type AddTaskAT = {
  type: 'ADD-TASK',
  todoListId: string,
  title: string
}
export type ChangeStatusAT = {
  type: 'CHANGE-STATUS',
  todoListId: string,
  taskId: number | string
  isDone: boolean
}
test('check removed task', () => {
  const startState: TasksType = {
    'todolistId1': [
      {id: '1', title: 'CSS', isDone: false},
      {id: '2', title: 'JS', isDone: true},
      {id: '3', title: 'React', isDone: false}
    ],
    'todolistId2': [
      {id: '1', title: 'bread', isDone: false},
      {id: '2', title: 'milk', isDone: true},
      {id: '3', title: 'tea', isDone: false}
    ]
  }
  const action = removeTaskAC('todolistId2','2')
  const endState = taskReducer(startState, action)
  expect(endState).toEqual({
    'todolistId1': [
      {id: '1', title: 'CSS', isDone: false},
      {id: '2', title: 'JS', isDone: true},
      {id: '3', title: 'React', isDone: false}
    ],
    'todolistId2': [
      {id: '1', title: 'bread', isDone: false},
      {id: '3', title: 'tea', isDone: false}
    ]
  })
})
test('check add task', () => {
  const startState: TasksType = {
    'todolistId1': [
      {id: '1', title: 'CSS', isDone: false},
      {id: '2', title: 'JS', isDone: true},
      {id: '3', title: 'React', isDone: false}
    ],
    'todolistId2': [
      {id: '1', title: 'bread', isDone: false},
      {id: '2', title: 'milk', isDone: true},
      {id: '3', title: 'tea', isDone: false}
    ]
  }
  const action = addTaskAC('todolistId2','juce')

  const endState = taskReducer(startState, action)

  expect(endState['todolistId1'].length).toBe(3)
  expect(endState['todolistId2'].length).toBe(4)
  expect(endState['todolistId2'][0].id).toBeDefined()
  expect(endState['todolistId2'][0].title).toBe('juce')
  expect(endState['todolistId2'][0].isDone).toBe(false)
})
test('check change status in task', () => {
  const startState: TasksType = {
    'todolistId1': [
      {id: '1', title: 'CSS', isDone: false},
      {id: '2', title: 'JS', isDone: true},
      {id: '3', title: 'React', isDone: false}
    ],
    'todolistId2': [
      {id: '1', title: 'bread', isDone: false},
      {id: '2', title: 'milk', isDone: true},
      {id: '3', title: 'tea', isDone: false}
    ]
  }

  const action = changeTaskStatusAC('todolistId2',  '2', false)

  const endState = taskReducer(startState, action)

  expect(endState['todolistId2'][2].isDone).toBe(false)
  expect(endState['todolistId2'][0].isDone).toBe(false)
})