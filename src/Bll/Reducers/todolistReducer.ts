import {FilterValuesType, todolistAPI, TodolistType} from "../../Api/todolist-api";
import {Dispatch} from "redux";
import {v1} from "uuid";
//TYPE
export type SetTodolistsAT = ReturnType<typeof setTodolistsAC>
export type RemoveTodolistAT = ReturnType<typeof removeTodolistAC>
export type AddTodolistAT = ReturnType<typeof addTodolistAC>
export type ChangeTodolistTitleAT = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterAT = ReturnType<typeof changeTodolistFilterAC>
export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType
}
export type todoListACType =
  | SetTodolistsAT
  | RemoveTodolistAT
  | AddTodolistAT
  | ChangeTodolistTitleAT
  | ChangeTodolistFilterAT

const initialState: Array<TodolistDomainType> = []
export const todolistReducer = (state: Array<TodolistDomainType> = initialState, action: todoListACType): Array<TodolistDomainType>  => {

  switch (action.type) {
    case "SET-TODOLISTS":
      return action.todolists.map(t => ({...t, filter: "all"}))
    case 'REMOVE-TODOLIST':
      return state.filter(t => t.id !== action.todoListId)
    case 'ADD-TODOLIST':
      let newToDoList: TodolistDomainType = {
        id: action.todolistId,
        title: action.title,
        filter: 'all',
        addedDate: '',
        order: 0
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

//ACTION CREATOR
export const setTodolistsAC = (todolists: Array<TodolistDomainType>) => ({type: 'SET-TODOLISTS', todolists: todolists} as const)

export const removeTodolistAC = (todolistId: string) => ({
  type: 'REMOVE-TODOLIST',
  todoListId: todolistId
} as const)

export const addTodolistAC = (newTitle: string) => ({
  type: 'ADD-TODOLIST',
  todolistId: v1(),
  title: newTitle
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

export const fetchTodolistThunk = (dispatch: Dispatch) => {
  todolistAPI.getTodolist().then(res => {
    dispatch(setTodolistsAC(res.data))
  })
}