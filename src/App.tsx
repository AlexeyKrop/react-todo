import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {AddItemForm} from "./Components/AddItemForm";
import {
  changeTodolistFilterAC,
  changeTodolistTitleTC,
  createTodolistTC,
  fetchTodolistsTC,
  removeTodolistTC
} from "./Bll/Reducers/todolistReducer";
import {addTaskTC, removeTaskTC, updateTaskStatusTC, updateTaskTitleTC} from "./Bll/Reducers/taskReducer";
import {FilterValuesType, TaskStatuses, TaskType} from "./Api/todolist-api";
import {useAppDispatch, useAppSelector} from "./Bll/state/hooks";
import {ErrorSnackbar} from "./Components/ErrorSnackBar/ErrorSnackBar";
import AppBar from '@mui/material/AppBar/AppBar';
import Toolbar from '@mui/material/Toolbar/Toolbar';
import IconButton from '@mui/material/IconButton/IconButton';
import Typography from '@mui/material/Typography/Typography';
import Button from '@mui/material/Button/Button';
import LinearProgress from '@mui/material/LinearProgress/LinearProgress';
import Container from '@mui/material/Container/Container';
import Grid from '@mui/material/Grid/Grid';
import Paper from '@mui/material/Paper/Paper';

export type TasksType = {
  [key: string]: Array<TaskType>
}




function App() {
  const todoList = useAppSelector(state => state.todoList)
  const tasks = useAppSelector(state => state.tasks)
  const status = useAppSelector((state) => state.app.status)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchTodolistsTC())
  }, [dispatch])

  const addToDoList = useCallback((title: string) => {
    dispatch(createTodolistTC(title))
  }, [dispatch])

  const removeTask = useCallback((todoListId: string, taskId: string) => {
    dispatch(removeTaskTC(todoListId, taskId))
  }, [dispatch])

  const addTask = useCallback((todoListId: string, title: string) => {
    dispatch(addTaskTC(todoListId, title))
  }, [dispatch])

  const changeTaskStatus = useCallback((todoListId: string, taskId: string, status: TaskStatuses) => {
    dispatch(updateTaskStatusTC(todoListId, taskId, status))
  }, [dispatch])

  const changeTodolistFilter = useCallback((todoListId: string, value: FilterValuesType) => {
    dispatch(changeTodolistFilterAC(todoListId, value))
  }, [dispatch])

  const removeTodoList = useCallback((todoListId: string) => {
    dispatch(removeTodolistTC(todoListId))
  }, [dispatch])

  const onChangeInputValue = useCallback((todoListId: string, taskId: string, inputValue: string) => {
    dispatch(updateTaskTitleTC(todoListId, taskId, inputValue))
  }, [dispatch])

  const onChangeTodoListTitle = useCallback((todoListId: string, changeValueToDoTitle: string) => {
    dispatch(changeTodolistTitleTC(todoListId, changeValueToDoTitle))
  }, [dispatch])
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
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      {status === 'loading' && <LinearProgress sx={{position: 'absolute', width: '100%'}}/>}
      <Container fixed>
        <Grid container>
          <AddItemForm addTask={addToDoList}/>
        </Grid>
        <Grid container direction="row"
              alignItems="flex-start">
          {todoList.map(t => {
            return (
              <Grid style={{padding: '20px 0'}} key={t.id}>
                <Paper style={{padding: '20px', marginRight: '10px'}}>
                  <Todolist todoListId={t.id}
                            key={t.id}
                            title={t.title}
                            filter={t.filter}
                            entityStatus={t.entityStatus}
                            tasks={tasks[t.id]}
                            removeTask={removeTask}
                            changeFilter={changeTodolistFilter}
                            addTask={addTask}
                            changeTaskStatus={changeTaskStatus}
                            removeTodoList={removeTodoList}
                            onChangeInputValue={onChangeInputValue}
                            onChangeTodoListTitle={onChangeTodoListTitle}
                  />
                </Paper>
              </Grid>
            )
          })}
        </Grid>
      </Container>
      <ErrorSnackbar/>
    </div>
  );
}

export default App;
