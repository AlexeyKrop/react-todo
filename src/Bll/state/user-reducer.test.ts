import {userReducer} from "./user-reducer";
let startState = {age: 90, childrenCount: 2,
  name: 'Lebron'}
test('check increment age',()=> {
  let action = {
    type: 'INCREMENT-AGE',
  }
  let endState = userReducer(startState, action)
  expect(endState.age).toBe(91)
  expect(endState.childrenCount).toBe(2)
  expect(endState.name).toBe('Lebron')
})
test('check change name', () => {
  let action = {
    type: 'CHANGE-NAME',
    name: 'Doncic',
  }
  let endState = userReducer(startState, action)
  expect(endState.name).toBe('Doncic')
})