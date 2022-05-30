import {combineReducers, createStore} from "redux";
import {todolistReducer} from "../Reducers/todolistReducer";
import {taskReducer} from "../Reducers/taskReducer";

const rootReducers = combineReducers({
  todolist: todolistReducer,
  tasks: taskReducer
})
export const store = createStore(rootReducers)