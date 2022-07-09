import {FilterValuesType, todolistAPI, TodolistType} from "../../Api/todolist-api";
import {Dispatch} from "redux";
import {RequestStatusType, setAppErrorAC, setAppStatusAC} from "./appReducer";

const initialState: Array<TodolistDomainType> = []
//REDUCER
export const todolistReducer = (state: Array<TodolistDomainType> = initialState, action: todoListACType): Array<TodolistDomainType> => {
  switch (action.type) {
    case "SET-TODOLISTS":
      return action.todolists.map(t => ({...t, filter: "all"}))
    case 'REMOVE-TODOLIST':
      return state.filter(t => t.id !== action.todoListId)
    case 'ADD-TODOLIST':
      return [{...action.todolist, filter: "all", entityStatus: "idle"}, ...state]
    case 'CHANGE-TODOLIST_TITLE':
      return state.map(t => t.id === action.todoListId ? {...t, title: action.changeValueToDoTitle} : t)
    case 'CHANGE-TODOLIST_FILTER':
      return state.map(t => t.id === action.todoListId ? {...t, filter: action.filter} : t)
    default:
      return state
  }
}

//ACTION CREATOR
export const setTodolistsAC = (todolists: Array<TodolistDomainType>) => ({
  type: 'SET-TODOLISTS',
  todolists: todolists
} as const)
export const removeTodolistAC = (todolistId: string) => ({
  type: 'REMOVE-TODOLIST',
  todoListId: todolistId
} as const)
export const addTodolistAC = (todolist: TodolistType) => ({
  type: 'ADD-TODOLIST',
  todolist,
  filter: 'all'
} as const)
export const changeTodolistTitleAC = (todoListId: string, changeTitle: string) => ({
  type: 'CHANGE-TODOLIST_TITLE',
  todoListId: todoListId,
  changeValueToDoTitle: changeTitle
} as const)
export const changeTodolistFilterAC = (todoListId: string, newFilter: FilterValuesType) => ({
  type: 'CHANGE-TODOLIST_FILTER',
  todoListId: todoListId,
  filter: newFilter
} as const)

//THUNK CREATOR
export const fetchTodolistsTC = () => {
  return (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.getTodolist()
      .then(res => {
        dispatch(setTodolistsAC(res.data))
        dispatch(setAppStatusAC("succeeded"))
      })
  }
}
export const createTodolistTC = (title: string) => {
  return (dispatch: Dispatch) => {
    dispatch(setAppStatusAC("loading"))
    todolistAPI.createTodolist(title)
      .then(res => {
        if (res.data.resultCode === 0) {
          dispatch(addTodolistAC(res.data.data.item))
          dispatch(setAppStatusAC("succeeded"))
        } else {
          if (res.data.messages.length) {
            dispatch(setAppErrorAC(res.data.messages[0]))
          } else {
            dispatch(setAppErrorAC('Some error occurred'))
          }
          dispatch(setAppStatusAC('failed'))
        }

      })
  }
}
export const removeTodolistTC = (todolistId: string) => {
  return (dispatch: Dispatch) => {
    dispatch(setAppStatusAC("loading"))
    todolistAPI.deleteTodolist(todolistId)
      .then(() => {
        dispatch(removeTodolistAC(todolistId))
        dispatch(setAppStatusAC("succeeded"))
      })
  }
}
export const changeTodolistTitleTC = (todolistId: string, title: string) => {
  return (dispatch: Dispatch) => {
    dispatch(setAppStatusAC("loading"))
    todolistAPI.updateTodolist(todolistId, title)
      .then(() => {
        dispatch(changeTodolistTitleAC(todolistId, title))
        dispatch(setAppStatusAC("succeeded"))
      })
  }

}

//TYPE
export type SetTodolistsAT = ReturnType<typeof setTodolistsAC>
export type RemoveTodolistAT = ReturnType<typeof removeTodolistAC>
export type AddTodolistAT = ReturnType<typeof addTodolistAC>
export type ChangeTodolistTitleAT = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterAT = ReturnType<typeof changeTodolistFilterAC>
export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType
  entityStatus: RequestStatusType
}
export type todoListACType =
  | SetTodolistsAT
  | RemoveTodolistAT
  | AddTodolistAT
  | ChangeTodolistTitleAT
  | ChangeTodolistFilterAT
