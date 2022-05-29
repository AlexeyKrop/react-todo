import {TasksType} from "../../App";
import {AddTodolistAT, RemoveTodolistAT} from "./todolistReducer";
import {v1} from "uuid";

export const taskReducer = (state: TasksType, action: TaskReducerType) => {
  switch (action.type) {
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
      return{
        ...state,
        [action.todoListId]: state[action.todoListId].map(t => t.id === action.taskId ? {
          ...t,
          title: action.changeValueTaskTitle
        } : t)
      }

      case "ADD-TODOLIST":
      return{
        ...state,
        [action.todoListId]: [],

      }

      case "REMOVE-TODOLIST":

      let copyState = {...state}
      delete copyState[action.todoListId]
      return copyState

    case "CHANGE-INPUT-VALUE":
      return{
        ...state,
        [action.todoListId]: state[action.todoListId].map(t => t.id === action.taskId ? {...t, title: action.changeInputValue} : t)
      }
    default:
      return state
  }
}
export type RemoveTaskAT = {
  type: 'REMOVE-TASK',
  todoListId: string,
  taskId: string | number
}
export type AddTaskAT = {
  type: 'ADD-TASK',
  todoListId: string,
  title: string
}
export type ChangeStatusAT = {
  type: 'CHANGE-STATUS',
  todoListId: string,
  taskId: number | string
  isDone: boolean
}
export type ChangeTaskTitleAT = {
  type: 'CHANGE-TASK-TITLE',
  todoListId: string,
  taskId: number | string
  changeValueTaskTitle: string,
}
export type onChangeInputValueAT = {
  type: 'CHANGE-INPUT-VALUE',
  todoListId: string,
  taskId: number | string
  changeInputValue: string,
}

type TaskReducerType = RemoveTaskAT | AddTaskAT | ChangeStatusAT | ChangeTaskTitleAT | AddTodolistAT | RemoveTodolistAT | onChangeInputValueAT

export const removeTaskAC = (todoListId: string, taskId: string | number):RemoveTaskAT  => {
  return {
    type: 'REMOVE-TASK',
    todoListId: todoListId,
    taskId: taskId
  }
}

export const addTaskAC = (todoListId: string, newTitle: string): AddTaskAT => {
  return {
    type: 'ADD-TASK',
    todoListId: todoListId,
    title: newTitle,
  }
}

export const changeTaskStatusAC = (todoListId: string, taskId: string | number, isDone: boolean) : ChangeStatusAT => {
  return {
    type: 'CHANGE-STATUS',
    todoListId: todoListId,
    taskId: taskId,
    isDone: isDone,
  }
}

export const changeTaskTitleAC = (todoListId: string, taskId: string | number, newTitle: string): ChangeTaskTitleAT => {
  return{
    type: 'CHANGE-TASK-TITLE',
    todoListId: todoListId,
    taskId: taskId,
    changeValueTaskTitle: newTitle,
  }
}

export const onChangeInputValueAC = (todoListId: string, taskId: string | number, changeInputValue: string): onChangeInputValueAT => {
  return{
    type: 'CHANGE-INPUT-VALUE',
    todoListId: todoListId,
    taskId: taskId,
    changeInputValue: changeInputValue,
  }
}
