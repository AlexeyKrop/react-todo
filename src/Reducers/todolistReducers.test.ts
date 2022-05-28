import {
  AddTodolistAC,
  ChangeTodolistAC,
  ChangeTodolistFilterAC,
  RemoveTodolistAC,
  todolistReducer
} from "./todolistReducer";
import {v1} from "uuid";
import {TodoListType} from "../App";
const todoListID_1 = v1()
const todoListID_2 = v1()
export const todoListID_3 = v1()
const startState: Array<TodoListType> = [{
  id: todoListID_1,
  title: 'What to Learn',
  filter: 'all'
}, {
  id: todoListID_2,
  title: 'What to bue',
  filter: 'all'
},]
test('check removed todolist', () => {
  const endState = todolistReducer(startState, RemoveTodolistAC(todoListID_2))
  expect(endState.length).toBe(1)
  expect(endState[0].id).toBe(todoListID_1)
})
test('check add todolist', () => {
  const endState = todolistReducer(startState, AddTodolistAC(todoListID_3, 'New todolist'))
  expect(endState.length).toBe(3)
  expect(endState[0].id).toBe(todoListID_3)
  expect(endState[0].title).toBe('New todolist')
})
test('check change todolist title', () => {
  const endState = todolistReducer(startState, ChangeTodolistAC(todoListID_2, 'what to bue in basket product'))
  expect(endState[1].id).toBe(todoListID_2)
  expect(endState[1].title).toBe('what to bue in basket product')
})
test('check change todolist filter', () => {
  const endState = todolistReducer(startState, ChangeTodolistFilterAC(todoListID_1, 'completed'))
  expect(endState[0].filter).toBe('completed')
})