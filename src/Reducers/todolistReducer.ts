import {TodoListType} from "../App";

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
    default:
      return state
  }
}

type todoListACType = {
  type: string
  todoListId: string
  title?: string
}
export const todoListAC = (todoListId: string) => {
  return {
    type: 'REMOVE-TODOLIST',
    todoListId: todoListId
  } as const
}