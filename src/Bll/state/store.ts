import {combineReducers, createStore} from "redux";
import {todolistReducer} from "../Reducers/todolistReducer";
import {taskReducer} from "../Reducers/taskReducer";

const rootReducers = combineReducers({
  todoList: todolistReducer,
  tasks: taskReducer
})
export const store = createStore(rootReducers)
export type AppRootStateType = ReturnType<typeof rootReducers>
// @ts-ignore
window.store = store