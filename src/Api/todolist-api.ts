import axios from "axios";
import {TodolistDomainType} from "../Bll/Reducers/todolistReducer";
//settings
const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  withCredentials: true,
  headers: {
    'API-KEY': 'e740762a-947d-4fd0-b06d-9b4eb349c99e'
  }
})

//api
export const todolistAPI = {
  getTodolist(){
    return instance.get<Array<TodolistDomainType>>('todo-lists')
  },
  createTodolist(title: string){
    return instance.post<{ title: string },ResponseType>('todo-lists', {title})
  },
  updateTodolist(todolistId: string, title: string){
    return instance.put<{ title: string },ResponseType>(`todo-lists/${todolistId}`, {title})
  },
  deleteTodolist(todolistId: string){
    return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
  },
  getTask(todolistId: string){
    return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
  },
  createTask(todolistId: string, title: string){
    return instance.post<{ title: string },ResponseType<{item: TaskType}>>(`todo-lists/${todolistId}/tasks`,{title})
  },
  updateTask(todolistId:string, taskId: string, model: UpdateTaskModelType){
    return instance.put<UpdateTaskModelType, ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
  },
  deleteTask(todolistId:string, taskId: string){
    return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
  }
}




//Type
export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType =  {
  id: string
  title: string
  addedDate: string
  order: number
}
export type ResponseType<D = {}> = {
  resultCode: number
  messages: Array<string>
  fieldsErrors: Array<string>
  data: D
}
export type TaskType = {
  description: string
  title: string
  completed: boolean
  status: TaskStatuses
  priority: TaskPriorities
  startDate: string
  deadline: string
  id: string
  todoListId: string
  order: number
  addedDate: string

}
export type GetTasksResponse = {
  error: string | null
  totalCount: number
  items: Array<TaskType>
}


export enum TaskStatuses {
  New = 0,
  InProgress = 1,
  Completed = 2,
  Draft = 3
}
export enum TaskPriorities {
  Low = 0,
  Middle = 1,
  Hi = 2,
  Urgently = 3,
  Later = 4
}
export type UpdateTaskModelType = {
  title: string
  description: string
  status: TaskStatuses
  priority: TaskPriorities
  startDate: string
  deadline: string
}


