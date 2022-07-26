import {TasksType} from "../../App";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses} from "../../Api/todolist-api";
import {removeTaskAC, taskReducer} from "./taskReducer";

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