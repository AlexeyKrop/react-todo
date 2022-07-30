import {AnyAction, applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import {todolistReducer} from "../Reducers/todolistReducer";
import {taskReducer} from "../Reducers/taskReducer";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {appReducer} from "../Reducers/appReducer";
import {authReducer} from "../Reducers/authReducer";

const rootReducers = combineReducers({
  todoList: todolistReducer,
  tasks: taskReducer,
  app: appReducer,
  auth: authReducer
})

export const store = createStore(rootReducers, applyMiddleware(thunk))
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AnyAction>
export type AppRootStateType = ReturnType<typeof rootReducers>
// export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AnyAction>
// @ts-ignore
//window.store = store