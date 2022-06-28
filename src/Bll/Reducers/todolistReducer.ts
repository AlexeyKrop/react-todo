import {FilterValuesType, TodoListType} from "../../App";

export type todoListACType =
  RemoveTodolistAT
  | AddTodolistAT
  | ChangeTodolistTitleAT
  | ChangeTodolistFilterAT

const initialState: Array<TodoListType> = []

export const todolistReducer = (state: Array<TodoListType> = initialState, action: todoListACType): Array<TodoListType>  => {
  switch (action.type) {
    case 'REMOVE-TODOLIST':
      return state.filter(t => t.id !== action.todoListId)
    case 'ADD-TODOLIST':
      let newToDoList: TodoListType = {
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

export const removeTodolistAC = (todolistId: string) => ({
  type: 'REMOVE-TODOLIST',
  todoListId: todolistId
} as const)

export const addTodolistAC = (todolistId: string, newTitle: string) => ({
  type: 'ADD-TODOLIST',
  todoListId: todolistId,
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

export type RemoveTodolistAT = ReturnType<typeof removeTodolistAC>
export type AddTodolistAT = ReturnType<typeof addTodolistAC>
export type ChangeTodolistTitleAT = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterAT = ReturnType<typeof changeTodolistFilterAC>