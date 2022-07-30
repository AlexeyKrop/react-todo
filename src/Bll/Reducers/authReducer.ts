

const initialState = {
  isAuth: false
}

//REDUCER
export const authReducer = (state: InitialStateType = initialState, action: authACType): InitialStateType => {
  switch (action.type) {
    case "AUTH/SET-AUTH":
    return {
      ...state,
      isAuth: action.value
    }
    default:
      return state
  }
}

//ACTION CREATOR
export const setAuthAC = (value: boolean) => ({type: 'AUTH/SET-AUTH',value} as const)


//THUNK CREATOR
export const setAuthTC = () => {

}

//TYPE
export type InitialStateType = typeof initialState
export type SetAuthAT = ReturnType<typeof setAuthAC>
export type authACType =
  | SetAuthAT
