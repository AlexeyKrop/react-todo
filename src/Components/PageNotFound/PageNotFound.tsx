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
    <div className={s.wrapperPage}>
    <div >
      <div className={s.starsec}/>
      <div className={s.starthird}/>
      <div className={s.starfourth}/>
      <div className={s.starfifth}/>
    </div>

    <div className={s.lampWrap}>
      <div className={s.lamp}>
        <div className={s.cable}/>
        <div className={s.cover}/>
        <div className={s.inCover}>
          <div className={s.bulb}/>
        </div>
        <div className={s.light}/>
      </div>
    </div>
    <section className={s.error}>
      <div className={s.error__content}>
        <div className={`${s.errorMessage}`}>
          <h1 className={s.messageTitle}>Page Not Found</h1>
          <p className={s.messageText}>We're sorry, the page you were looking for isn't found here. The link you followed may either be broken or no longer exists. Please try again, or take a look at our.</p>
        </div>
      </div>

    </section>

    </div>
  )
}