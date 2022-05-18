import {FilterValuesType, TodoListType} from "../App";
import {
  addTodolistActionType,
  changeTodolistFilterActionType,
  changeTodolistTitleActionType,
  removeTodolistActionType
} from "./todolistReducers.test";

type todoListACType =
  removeTodolistActionType
  | addTodolistActionType
  | changeTodolistTitleActionType
  | changeTodolistFilterActionType
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
// export const todoListAC = (todoListId: string) => {
//   return {
//     type: 'REMOVE-TODOLIST',
//     todoListId: todoListId
//   } as const
// }
export const RemoveTodolistAC = (todolistId: string): removeTodolistActionType => {
  return {type: 'REMOVE-TODOLIST', todoListId: todolistId}
}
export const AddTodolistAC = (todolistId: string, newTitle: string): addTodolistActionType => {
  return {type: 'ADD-TODOLIST', todoListId: todolistId, title: newTitle}
}
export const ChangeTodolistAC = (todoListId: string, changeTitle: string): changeTodolistTitleActionType => {
  return {
    type: 'CHANGE-TODOLIST_TITLE',
    todoListId: todoListId,
    changeValueToDoTitle: changeTitle
  }
}
export const ChangeTodolistFilterAC  = (todoListId: string, newFilter: FilterValuesType): changeTodolistFilterActionType => {
  return{
    type: 'CHANGE-TODOLIST_FILTER',
    todoListId: todoListId,
    filter: newFilter
  }
}
