import {Dispatch} from "redux";
import {setAppStatusAC} from "./appReducer";
import {authAPI, AuthParamsType} from "../../Api/todolist-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {AxiosError} from "axios";


const initialState = {
  isLogin: false
}

//REDUCER
export const authReducer = (state: InitialStateType = initialState, action: authACType): InitialStateType => {
  switch (action.type) {
    case "AUTH/SET-IS-LOGGED-IN":
      return {
        ...state,
        isLogin: action.value
      }
    default:
      return state
  }
}

//ACTION CREATOR
export const setIsLoggedInAC = (value: boolean) => ({type: 'AUTH/SET-IS-LOGGED-IN', value} as const)


//THUNK CREATOR
export const loginTC = (params: AuthParamsType) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC("loading"))
  authAPI.login(params)
    .then(res => {
      if (res.data.resultCode === 0) {
        dispatch(setIsLoggedInAC(true))
        dispatch(setAppStatusAC("succeeded"))

      } else {
        handleServerAppError(dispatch, res.data)
      }
    })
    .catch((error: AxiosError) => {
      handleServerNetworkError(dispatch, error.message, 'failed')
    })
}
export const logoutTC = () => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC("loading"))
  authAPI.logout()
    .then(res => {
      if (res.data.resultCode === 0) {
        dispatch(setAppStatusAC("succeeded"))
        dispatch(setIsLoggedInAC(false))
      } else {
        handleServerAppError(dispatch, res.data)
      }
    })
    .catch((error: AxiosError) => {
      handleServerNetworkError(dispatch, error.message, 'failed')
    })
}

//TYPE
export type InitialStateType = {
  isLogin: boolean
}
export type SetAuthAT = ReturnType<typeof setIsLoggedInAC>
export type authACType =
  | SetAuthAT
