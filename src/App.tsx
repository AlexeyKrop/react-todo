import React, {useEffect} from 'react';
import './App.css';
import {useAppDispatch, useAppSelector} from "./Bll/state/hooks";
import {ErrorSnackbar} from "./Components/ErrorSnackBar/ErrorSnackBar";
import AppBar from '@mui/material/AppBar/AppBar';
import Toolbar from '@mui/material/Toolbar/Toolbar';
import IconButton from '@mui/material/IconButton/IconButton';
import Typography from '@mui/material/Typography/Typography';
import Button from '@mui/material/Button/Button';
import LinearProgress from '@mui/material/LinearProgress/LinearProgress';
import Login from "./Components/Login/Login";
import {TodolistsList} from "./TodolistsList";
import {Navigate, Route, Routes} from 'react-router-dom';
import {logoutTC} from "./Bll/Reducers/authReducer";
import {appInitialTC} from "./Bll/Reducers/appReducer";


const App = () => {
  const status = useAppSelector(state => state.app.status)
  const initialized = useAppSelector(state => state.app.initialized)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(appInitialTC())
  }, [])
  const onClickLogOut = () => {
    dispatch(logoutTC())
  }

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{mr: 2}}
          >
          </IconButton>
          <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
            News
          </Typography>
          <Button onClick={onClickLogOut} color="inherit">Log out</Button>
        </Toolbar>
      </AppBar>
      {status === 'loading' && <LinearProgress sx={{position: 'absolute', width: '100%'}}/>}
      <Routes>
        <Route path="/react-todo" element={<TodolistsList/>}/>
        <Route path="/" element={<TodolistsList/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>

      <ErrorSnackbar/>
    </div>
  );
};
export default App;
