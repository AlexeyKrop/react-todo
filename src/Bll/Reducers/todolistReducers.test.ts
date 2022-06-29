import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC,
  TodolistDomainType,
  todolistReducer
} from "./todolistReducer";
import {v1} from "uuid";

let startState: Array<TodolistDomainType> = []
let todoListID_1: string
let todoListID_2: string
export const todoListID_3 = v1()

beforeEach(() => {
  todoListID_1 = v1()
  todoListID_2 = v1()
  startState = [
    {id: 'a4b4f1bf-7a69-4780-b7d3-69cbbace6273',
      title: 'JS+REACT the best',
      addedDate: '2022-06-28T18:14:01.19',
      order: -6,
      filter: 'all'}]
})

test('check set todolist in server', () => {
  const todo = {
    id: 'a4b4f1bf-7a69-4780-b7d3-69cbbace6273',
    title: 'JS+REACT the best',
    addedDate: '2022-06-28T18:14:01.19',
    order: -6,
    filter: 'all'}
  // const endState = todolistReducer([], setTodolistAC(todo))
})

test('check removed todolist', () => {
  const endState = todolistReducer(startState, removeTodolistAC(todoListID_2))
  expect(endState.length).toBe(1)
  expect(endState[0].id).toBe(todoListID_1)
})

test('check add todolist', () => {
  const endState = todolistReducer(startState, addTodolistAC(todoListID_3, 'New todolist'))
  expect(endState.length).toBe(3)
  expect(endState[0].id).toBe(todoListID_3)
  expect(endState[0].title).toBe('New todolist')
})

test('check change todolist title', () => {
  const endState = todolistReducer(startState, changeTodolistTitleAC(todoListID_2, 'what to bue in basket product'))
  expect(endState[1].id).toBe(todoListID_2)
  expect(endState[1].title).toBe('what to bue in basket product')
})

test('check change todolist filter', () => {
  const endState = todolistReducer(startState, changeTodolistFilterAC(todoListID_1, 'completed'))
  expect(endState[0].filter).toBe('completed')
})