import {RequestStatusType, setAppErrorAC, setAppStatusAC} from "../Bll/Reducers/appReducer";
import {Dispatch} from "redux";

export const handleServerNetworkError = (dispatch: Dispatch, error: string, status: RequestStatusType) => {
  dispatch(setAppErrorAC(error))
  dispatch(setAppStatusAC(status))
}