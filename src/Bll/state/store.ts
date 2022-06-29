import {AnyAction, applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import {todolistReducer} from "../Reducers/todolistReducer";
import {taskReducer} from "../Reducers/taskReducer";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";

const rootReducers = combineReducers({
  todoList: todolistReducer,
  tasks: taskReducer
})

export const store = createStore(rootReducers, applyMiddleware(thunk))
export type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction>
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>
// @ts-ignore
//window.store = store