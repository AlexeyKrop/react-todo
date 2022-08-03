import React, {useEffect} from 'react';
import './App.css';
import {useAppDispatch, useAppSelector} from "./Bll/state/hooks";
import {ErrorSnackbar} from "./Components/ErrorSnackBar/ErrorSnackBar";
import AppBar from '@mui/material/AppBar/AppBar';
import Toolbar from '@mui/material/Toolbar/Toolbar';
import Button from '@mui/material/Button/Button';
import LinearProgress from '@mui/material/LinearProgress/LinearProgress';
import Login from "./Components/Login/Login";
import {TodolistsList} from "./TodolistsList";
import {Navigate, Route, Routes} from 'react-router-dom';
import {logoutTC} from "./Bll/Reducers/authReducer";
import {appInitialTC, selectApp} from "./Bll/Reducers/appReducer";
import LogoutIcon from '@mui/icons-material/Logout';
import {SimpleBackdrop} from "./Components/Backdrop/Backdrop";
import {Skeletons} from "./Components/Skeleton/Skeleton";
import {Page} from "./Components/PageNotFound/PageNotFound";

const App = () => {
  // const status = useAppSelector(state => state.app.status)
  // const initialized = useAppSelector(state => state.app.initialized)
  const {status, initialized} = useAppSelector(selectApp)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(appInitialTC())
  }, [])
  const onClickLogOut = () => {
    dispatch(logoutTC())
  }
  if (!initialized) {
    return <SimpleBackdrop/>
  }
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Button onClick={onClickLogOut} startIcon={<LogoutIcon/>} variant="text" color="inherit">Log out</Button>
        </Toolbar>
      </AppBar>
      <SimpleBackdrop/>
      {status === 'loading' && <LinearProgress sx={{position: 'absolute', width: '100%'}}/>}
      <Routes>
        <Route path="/react-todo" element={<TodolistsList/>}/>
        <Route path="/" element={<TodolistsList/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="404" element={<Page/>}/>
        <Route path="*" element={<Navigate to={'404'}/>}/>

      </Routes>
      {status === 'loading' && <Skeletons/>}
      <ErrorSnackbar/>
    </div>
  );
};
export default App;
