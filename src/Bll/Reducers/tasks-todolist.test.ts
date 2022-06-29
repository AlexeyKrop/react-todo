import {addTodolistAC, TodolistDomainType, todolistReducer} from "./todolistReducer";
import {taskReducer} from "./taskReducer";
import {TasksType} from "../../App";
import {todoListID_3} from "./todolistReducers.test";

test('ids should be equals', () => {
  const startTasksState: TasksType = {}
  const startTodolistsState: Array<TodolistDomainType> = []

  const action = addTodolistAC(todoListID_3,'new todolist')

  const endTasksState = taskReducer(startTasksState, action)
  const endTodolistsState = todolistReducer(startTodolistsState, action)

  const keys = Object.keys(endTasksState)
  const idFromTasks = keys[0]
  const idFromTodolists = endTodolistsState[0].id

  expect(idFromTasks).toBe(action.todolistId)
  expect(idFromTodolists).toBe(action.todolistId)
})
