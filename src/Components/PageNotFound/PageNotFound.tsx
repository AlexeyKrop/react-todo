import s from './PageNotFound.module.css'
import {useAppDispatch} from "../../Bll/state/hooks";
import {setAppStatusAC} from "../../Bll/Reducers/appReducer";
import {useEffect} from "react";
export const Page = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(setAppStatusAC('idle'))
  }, [])

  return (
    <>
      <div className={s.number}>404</div>
      <div className={s.text}><span>Ooops...</span>page not found</div>
    </>
  )
}