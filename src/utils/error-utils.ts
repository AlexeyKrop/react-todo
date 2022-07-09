import {RequestStatusType, setAppErrorAC, setAppStatusAC} from "../Bll/Reducers/appReducer";
import {Dispatch} from "redux";
import {ResponseType} from "../Api/todolist-api";

export const handleServerNetworkError = (dispatch: Dispatch, error: string, status: RequestStatusType) => {
  dispatch(setAppErrorAC(error))
  dispatch(setAppStatusAC(status))
}
export const handleServerAppError = <T>( dispatch: Dispatch, data: ResponseType<T>) => {
  if (data.messages.length) {
    dispatch(setAppErrorAC(data.messages[0]))
  } else {
    dispatch(setAppErrorAC('Some error occurred'))
  }
  dispatch(setAppStatusAC('failed'))
}
