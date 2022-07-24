import {addTodolistAC, removeTodolistAC, setTodolistsAC, TodolistDomainType, todolistReducer} from "./todolistReducer";
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
      filter: 'all',
      entityStatus: "idle"
    },
  ]
})
test('check add Todolist', () => {
  let newTodo = {
    id: todolistID_2,
    title: 'new todo',
    addedDate: 'string',
    order: -2
  }
  let endState = todolistReducer(startState , addTodolistAC(newTodo))
  expect(endState.length).toBe(2)
  expect(endState[0].title).toBe('new todo')
})
test('check fetch todolist', () => {
  let endState = todolistReducer(startState , setTodolistsAC(startState))
  expect(endState.length).toBe(1)
  expect(endState[0].title).toBe('What to Learn')
})
test('check remove todolist', () => {
  let endState = todolistReducer(startState , removeTodolistAC(todolistID_1))
  expect(endState.length).toBe(0)
  expect(endState[0]).toBeUndefined()
})
