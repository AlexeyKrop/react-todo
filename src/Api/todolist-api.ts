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
    return instance.get<Array<TodolistType>>('todo-lists')
  },
  createTodolist(title: string){
    return instance.post<Array<CreateTodolistResponseType>>('todo-lists', {title})
  }
}



//Type
export type TodolistType = {
  id: string
  addedDate: string
  order: number
  title: string
}
export type CreateTodolistResponseType = {
  resultCode: number
  messages: Array<string>
  data: {
    item: TodolistType
  }
}