import {
  addTodolistAC,
  changeTodolistTitleAC,
  changeTodolistFilterAC,
  removeTodolistAC,
  todolistReducer
} from "./todolistReducer";
import {v1} from "uuid";
import {TodoListType} from "../../App";

let startState: Array<TodoListType> = []
let todoListID_1: string
let todoListID_2: string
export const todoListID_3 = v1()

beforeEach(() => {
  todoListID_1 = v1()
  todoListID_2 = v1()
  startState = [
    {
      id: todoListID_1,
      title: 'What to Learn',
      filter: 'all'
    },
    {
      id: todoListID_2,
      title: 'What to bue',
      filter: 'all'
    }]
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