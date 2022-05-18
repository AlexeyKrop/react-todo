import {v1} from "uuid";
import {AddTaskAC, ChangeStatusAC, RemoveTaskAC, taskReducer} from "./taskReducer";

const todoListID_1 = v1()
const todoListID_2 = v1()
const startState = {
  [todoListID_1]: [
    {id: v1(), title: "HTML&CSS", isDone: true},
    {id: v1(), title: "JS", isDone: true},
    {id: v1(), title: "ReactJS", isDone: false},
    {id: v1(), title: "Rest API", isDone: false},
    {id: v1(), title: "GraphQL", isDone: false},
  ],
  [todoListID_2]: [
    {id: v1(), title: "milk", isDone: true},
    {id: v1(), title: "solt", isDone: true},
    {id: v1(), title: "beer", isDone: false},
    {id: v1(), title: "juice", isDone: false},
    {id: v1(), title: "cola", isDone: false},
  ],
}
export type TaskReducerType = {
  type: string,
  todoListId: string,
  title?: string
  taskId?: number | string
  isDone?: boolean
}
test('check removed task', () => {
  const endState = taskReducer(startState, RemoveTaskAC(todoListID_1, 0))
  endState && expect(endState[todoListID_1].length).toBe(5)
})
test('check add task', () => {
  const endState = taskReducer(startState, AddTaskAC(todoListID_1, 'New Task'))
  endState && expect(endState[todoListID_1].length).toBe(6)
})
test('check change status in task', () => {
  // const action = {
  //   type: 'CHANGE-STATUS' as const,
  //   todoListId: todoListID_1,
  //   taskId: 0,
  //   isDone: false,
  // }
  const endState = taskReducer(startState, ChangeStatusAC(todoListID_1, 0, false))
  endState && expect(endState[todoListID_1][0].isDone).toBe(false)
})