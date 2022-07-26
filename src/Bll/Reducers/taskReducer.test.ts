import {TasksType} from "../../App";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses} from "../../Api/todolist-api";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, taskReducer} from "./taskReducer";

let startState: TasksType = {}
let todolistID_1: string
let todolistID_2: string
let taskID_1: string
beforeEach(() => {
  todolistID_1 = v1()
  todolistID_2 = v1()
  taskID_1 = v1()
  startState = {
    'todoListId1': [
      {
        description: 'string',
        title: 'JS',
        completed: true,
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        startDate: 'string',
        deadline: 'string',
        id: '1',
        todoListId: 'todoListId1',
        order: -1,
        addedDate: 'string',
      },
      {
        description: 'string',
        title: 'React',
        completed: true,
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        startDate: 'string',
        deadline: 'string',
        id: '2',
        todoListId: 'todoListId1',
        order: -1,
        addedDate: 'string',
      }
    ]
  }
})
test('check remove task', () => {
  let endState = taskReducer(startState, removeTaskAC('todoListId1','1'))
  expect(endState).toEqual({
    'todoListId1': [
      {
        description: 'string',
        title: 'JS',
        completed: true,
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        startDate: 'string',
        deadline: 'string',
        id: '2',
        todoListId: 'todoListId1',
        order: -1,
        addedDate: 'string',
      }
    ],
  })
})
test('check add task', () => {
  let newTask = {
    description: 'string',
    title: 'Redux',
    completed: true,
    status: TaskStatuses.New,
    priority: TaskPriorities.Low,
    startDate: 'string',
    deadline: 'string',
    id: '3',
    todoListId: 'todoListId1',
    order: -1,
    addedDate: 'string',
  }
  let endState = taskReducer(startState, addTaskAC(newTask))
  expect(endState!['todoListId1'].length).toBe(3)
})
test('check task title', () => {
  let endState = taskReducer(startState, changeTaskTitleAC('todoListId1','1', 'Angular'))
  expect(endState!['todoListId1'][0].title).toBe('Angular')
})
test('check task status', () => {
  let endState = taskReducer(startState, changeTaskStatusAC('todoListId1','1', TaskStatuses.InProgress,))
  expect(endState!['todoListId1'][0].status).toBe(1)
})