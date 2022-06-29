import {TasksType} from "../../App";
import {AddTodolistAT, RemoveTodolistAT, SetTodolistsAT} from "./todolistReducer";
import {v1} from "uuid";

const initialState: TasksType = {}

export const taskReducer = (state: TasksType = initialState, action: TaskReducerType) => {
  debugger
  switch (action.type) {
    case "SET-TODOLISTS":
        const stateCopy = {...state}
      action.todolists.forEach(t=> {
        stateCopy[t.id] = []
      })
      return stateCopy

    case 'REMOVE-TASK':
      return {...state, [action.todoListId]: state[action.todoListId].filter(t => t.id !== action.taskId)}
    case 'ADD-TASK':
      let newTask = {id: v1(), title: action.title, isDone: false};
      return {...state, [action.todoListId]: [newTask, ...state[action.todoListId]]}
    case 'CHANGE-STATUS':
      return {
        ...state,
        [action.todoListId]: state[action.todoListId].map(t => t.id === action.taskId ? {
          ...t,
          isDone: action.isDone
        } : t)
      }
    case "CHANGE-TASK-TITLE":
      return {
        ...state,
        [action.todoListId]: state[action.todoListId].map(t => t.id === action.taskId ? {
          ...t,
          title: action.changeValueTaskTitle
        } : t)
      }
    case "ADD-TODOLIST":
      return {
        ...state,
        [action.todolistId]: [],

      }
    case "REMOVE-TODOLIST":

      let copyState = {...state}
      delete copyState[action.todoListId]
      return copyState
    case "CHANGE-INPUT-VALUE":
      return {
        ...state,
        [action.todoListId]: state[action.todoListId].map(t => t.id === action.taskId ? {
          ...t,
          title: action.changeInputValue
        } : t)
      }
    default:
      return state
  }
}


//ACTION TYPE
export type RemoveTaskAT = ReturnType<typeof removeTaskAC>
export type AddTaskAT = ReturnType<typeof addTaskAC>
export type ChangeStatusAT = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleAT = ReturnType<typeof changeTaskTitleAC>
export type onChangeInputValueAT = ReturnType<typeof onChangeInputValueAC>
type TaskReducerType =
  | SetTodolistsAT
  | RemoveTaskAT
  | AddTaskAT
  | ChangeStatusAT
  | ChangeTaskTitleAT
  | AddTodolistAT
  | RemoveTodolistAT
  | onChangeInputValueAT

//ACTION CREATOR
export const removeTaskAC = (todoListId: string, taskId: string | number) => {
  return {
    type: 'REMOVE-TASK',
    todoListId: todoListId,
    taskId: taskId
  } as const
}

export const addTaskAC = (todoListId: string, newTitle: string) => {
  return {
    type: 'ADD-TASK',
    todoListId: todoListId,
    title: newTitle,
  } as const
}

export const changeTaskStatusAC = (todoListId: string, taskId: string | number, isDone: boolean) => {
  return {
    type: 'CHANGE-STATUS',
    todoListId: todoListId,
    taskId: taskId,
    isDone: isDone,
  } as const
}

export const changeTaskTitleAC = (todoListId: string, taskId: string | number, newTitle: string) => {
  return {
    type: 'CHANGE-TASK-TITLE',
    todoListId: todoListId,
    taskId: taskId,
    changeValueTaskTitle: newTitle,
  } as const
}

export const onChangeInputValueAC = (todoListId: string, taskId: string | number, changeInputValue: string) => {
  return {
    type: 'CHANGE-INPUT-VALUE',
    todoListId: todoListId,
    taskId: taskId,
    changeInputValue: changeInputValue,
  } as const
}
