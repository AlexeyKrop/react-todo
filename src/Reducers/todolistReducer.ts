import {FilterValuesType, TodoListType} from "../App";
import {
  AddTodolistAT,
  ChangeTodolistFilterAT,
  ChangeTodolistTitleAT,
  RemoveTodolistAT
} from "./todolistReducers.test";

type todoListACType =
  RemoveTodolistAT
  | AddTodolistAT
  | ChangeTodolistTitleAT
  | ChangeTodolistFilterAT
export const todolistReducer = (state: Array<TodoListType>, action: todoListACType) => {
  switch (action.type) {
    case 'REMOVE-TODOLIST':
      return state.filter(t => t.id !== action.todoListId)
    case 'ADD-TODOLIST':
      let newToDoList = {
        id: action.todoListId,
        title: action.title,
        filter: "all",
      }
      return [newToDoList, ...state]
    case 'CHANGE-TODOLIST_TITLE':
      return state.map(t => t.id === action.todoListId ? {...t, title: action.changeValueToDoTitle} : t)
    case 'CHANGE-TODOLIST_FILTER':
      return state.map(t => t.id === action.todoListId ? {...t, filter: action.filter} : t)
    default:
      return state
  }
}

export const RemoveTodolistAC = (todolistId: string): RemoveTodolistAT => {
  return {type: 'REMOVE-TODOLIST', todoListId: todolistId}
}
export const AddTodolistAC = (todolistId: string, newTitle: string): AddTodolistAT => {
  return {type: 'ADD-TODOLIST', todoListId: todolistId, title: newTitle}
}
export const ChangeTodolistAC = (todoListId: string, changeTitle: string): ChangeTodolistTitleAT => {
  return {
    type: 'CHANGE-TODOLIST_TITLE',
    todoListId: todoListId,
    changeValueToDoTitle: changeTitle
  }
}
export const ChangeTodolistFilterAC = (todoListId: string, newFilter: FilterValuesType): ChangeTodolistFilterAT => {
  return {
    type: 'CHANGE-TODOLIST_FILTER',
    todoListId: todoListId,
    filter: newFilter
  }
}
