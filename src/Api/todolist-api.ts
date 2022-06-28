import axios from "axios";
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
    return instance.get<Array<ResponseType<{item: TodolistType}>>>('todo-lists')
  },
  createTodolist(title: string){
    return instance.post<ResponseType>('todo-lists', {title})
  },
  updateTodolist(todolistId: string, title: string){
    return instance.put<ResponseType>(`todo-lists/${todolistId}`, {title})
  },
  deleteTodolist(todolistId: string){
    return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
  },
  getTask(todolistId: string){
    return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
  },
  createTask(todolistId: string, title: string){
    return instance.post(`todo-lists/${todolistId}/tasks`,{title})
  }
}




//Type
export type TodolistType = {
  id: string
  addedDate: string
  order: number
  title: string
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
  status: number
  priority: number
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
export type CreateTaskResponse = {
  data: {
    item: TaskType
  },
  totalCount: number,
  error: string | null
}


