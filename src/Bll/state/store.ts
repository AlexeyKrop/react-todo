import {applyMiddleware, combineReducers, createStore} from "redux";
import {todolistReducer} from "../Reducers/todolistReducer";
import {taskReducer} from "../Reducers/taskReducer";
import thunk from "redux-thunk";
const rootReducers = combineReducers({
  todoList: todolistReducer,
  tasks: taskReducer
})
export const store = createStore(rootReducers, applyMiddleware(thunk))
export type AppRootStateType = ReturnType<typeof rootReducers>
// @ts-ignore
window.store = store