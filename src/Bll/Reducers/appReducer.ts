import {Dispatch} from "redux"
import {authAPI} from "../../Api/todolist-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {AxiosError} from "axios";
import {setAuthAC} from "./authReducer";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
  status: 'loading' as RequestStatusType,
  error: null as null | string,
  initialized: false
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: AppReducerType): InitialStateType => {
  switch (action.type) {
    case 'APP/SET-STATUS':
      return {...state, status: action.status}
    case "APP/SET-ERROR":
      return {
        ...state,
        error: action.error
      }
    case "APP/SET-APP-INITIAL":
      return {
        ...state,
        initialized: action.value
      }
    default:
      return state
  }
}

//ACTIONS CREATOR
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
export const setAppInitialAC = (value: boolean) => ({type: 'APP/SET-APP-INITIAL', value} as const)
//THUNKS
export const appInitialTC = () => (dispatch: Dispatch) => {
  authAPI.me()
    .then(res => {
      if (res.data.resultCode === 0) {
        dispatch(setAppInitialAC(true))
      } else {
        handleServerAppError(dispatch, res.data)
      }
    })
    .catch((error: AxiosError) => {
      handleServerNetworkError(dispatch, error.message, 'failed')
    })
}

//TYPES
type SetAppStatusAT = ReturnType<typeof setAppStatusAC>
type SetAppErrorAT = ReturnType<typeof setAppErrorAC>
type SetAppInitialAT = ReturnType<typeof setAppInitialAC>
type AppReducerType = SetAppStatusAT | SetAppErrorAT | SetAppInitialAT