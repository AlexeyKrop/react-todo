import {TasksType} from "../App";
import {TaskReducerType} from "./taskReducer.test";

export const taskReducer = (state: TasksType, action: TaskReducerType) => {
  switch (action.type) {
    case 'REMOVE-TASK':
      return {...state, [action.todoListId]: state[action.todoListId].filter(t => t.id !== action.taskId)}
    case 'ADD-TASK':
      let newTask = {id: action.todoListId, title: action.title, isDone: false};
      return {...state, [action.todoListId]: [newTask, ...state[action.todoListId]]}
    case 'CHANGE-STATUS':
      return {...state,
        [action.todoListId]: state[action.todoListId].map(t => t.id === action.taskId ? {
          ...t,
          isDone: action.isDone
        } : t)
      }
    default:
      return state
  }
}
export const RemoveTaskAC = (todoListId: string, taskId: string | number) => {
  return {
    type: 'REMOVE-TASK',
    todoListId: todoListId,
    taskId: taskId
  }
}
export const AddTaskAC = (todoListId: string, newTitle: string) => {
  return {
    type: 'ADD-TASK',
    todoListId: todoListId,
    title: newTitle,
  }
}
export const ChangeStatusAC = (todoListId: string, taskId: string | number, isDone: boolean) => {
  return {
    type: 'CHANGE-STATUS' as const,
    todoListId: todoListId,
    taskId: taskId,
    isDone: isDone,
  }
}