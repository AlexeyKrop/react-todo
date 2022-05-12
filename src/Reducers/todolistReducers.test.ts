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