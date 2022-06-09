import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  onChangeInputValueAC,
  removeTaskAC,
  taskReducer
} from "./taskReducer";
import {TasksType} from "../../App";
import {todoListID_3} from "./todolistReducers.test";
import {addTodolistAC, removeTodolistAC} from "./todolistReducer";

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
test('check change Tasks title', () => {
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
  const action = changeTaskTitleAC('todolistId2',  '2', 'coffee')
  const endState = taskReducer(startState, action)
  expect(endState['todolistId2'][1].title).toBe('coffee')
  expect(endState['todolistId1'][1].title).toBe('JS')
})
test('new array should be added when new todolist is added', () => {
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
  const action = addTodolistAC(todoListID_3,'new todolist')
  const endState = taskReducer(startState, action)
  const keys = Object.keys(endState)
  const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2')
  if (!newKey) {
    throw Error('new key should be added')
  }
  expect(keys.length).toBe(3)
  expect(endState[newKey]).toEqual([])
})
test('property with todolistId should be deleted', () =>{
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

  const action = removeTodolistAC('todolistId2')

  const endState = taskReducer(startState, action)


  const keys = Object.keys(endState)

  expect(keys.length).toBe(1)
  expect(endState['todolistId2']).not.toBeDefined()
})
test('check change input in task', () =>{
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

  const action = onChangeInputValueAC( 'todolistId1', '1', 'SASS')

  const endState = taskReducer(startState, action)

  expect(endState['todolistId1'][0].title).toBe('SASS')
})