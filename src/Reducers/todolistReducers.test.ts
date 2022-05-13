import {todolistReducer} from "./todolistReducer";
import {v1} from "uuid";

test('check removed todolist', () => {
  const todoListID_1 = v1()
  const todoListID_2 = v1()
  const startState = [{
    id: todoListID_1,
    title: 'What to Learn',
    filter: 'all'
  },
    {
      id: todoListID_2,
      title: 'What to bue',
      filter: 'all'
    },]
  const action = {
    type:'REMOVE-TODOLIST',
    todoListId: todoListID_2
  }
  const endState = todolistReducer(startState, action)
  expect(endState.length).toBe(1)
  expect(endState[0].id).toBe(todoListID_1)
})
test('check add todolist', () => {
  const todoListID_1 = v1()
  const todoListID_2 = v1()
  const todoListID_3 = v1()
  const startState = [{
    id: todoListID_1,
    title: 'What to Learn',
    filter: 'all'
  },
    {
      id: todoListID_2,
      title: 'What to bue',
      filter: 'all'
    },]
  const action = {
    type:'ADD-TODOLIST',
    todoListId: todoListID_3,
    title: 'New todolist'
  }
  const endState = todolistReducer(startState, action)
  expect(endState.length).toBe(3)
  expect(endState[0].id).toBe(todoListID_3)
  expect(endState[0].title).toBe('New todolist')
})
test('check todolist title', () => {
  const todoListID_1 = v1()
  const todoListID_2 = v1()
  const startState = [{
    id: todoListID_1,
    title: 'What to Learn',
    filter: 'all'
  },
    {
      id: todoListID_2,
      title: 'What to bue',
      filter: 'all'
    },]
  const action = {
    type:'CHANGE-TODOLIST_TITLE',
    todoListId: todoListID_2,
    changeValueToDoTitle: 'what to bue in basket product'
  }
  const endState = todolistReducer(startState, action)
  expect(endState[1].id).toBe(todoListID_2)
  expect(endState[1].title).toBe('what to bue in basket product')
})