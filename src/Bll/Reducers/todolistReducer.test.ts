import {TodolistDomainType} from "./todolistReducer";
import {v1} from "uuid";

let startState: Array<TodolistDomainType> = []
let todolistID_1: string
let todolistID_2: string
beforeEach(() => {
  todolistID_1 = v1()
  todolistID_2 = v1()
  startState = [
    {
      id: todolistID_1,
      title: 'What to Learn',
      addedDate: 'string',
      order: -1,
      filter: 'all'
    },
    {
      id: todolistID_1,
      title: 'What to Learn',
      addedDate: 'string',
      order: -1,
      filter: 'all'
    }
  ]
})
// test('check add Todolist', () => {
//   let endState = todolistReducer(startState , addTodolistAC('new todo'))
//   expect(endState.length).toBe(3)
//   expect(endState[0].title).toBe('new todo')
// })
