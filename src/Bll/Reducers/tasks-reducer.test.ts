import {AddTodolistAC, todolistReducer} from "./todolistReducer";
import {taskReducer} from "./taskReducer";
import {TasksType, TodoListType} from "../../App";
import {todoListID_3} from "./todolistReducers.test";
test('ids should be equals', () => {
  const startTasksState: TasksType = {}
  const startTodolistsState: Array<TodoListType> = []

  const action = AddTodolistAC(todoListID_3,'new todolist')

  const endTasksState = taskReducer(startTasksState, action)
  const endTodolistsState = todolistReducer(startTodolistsState, action)

  const keys = Object.keys(endTasksState)
  const idFromTasks = keys[0]
  const idFromTodolists = endTodolistsState[0].id

  expect(idFromTasks).toBe(action.todoListId)
  expect(idFromTodolists).toBe(action.todoListId)
})
