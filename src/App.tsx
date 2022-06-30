import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {AddItemForm} from "./Components/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {useSelector} from "react-redux";
import {RootState} from "./Bll/state/store";
import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC, changeTodolistTitleTC, createTodolistTC,
  fetchTodolistsTC,
  removeTodolistAC, removeTodolistTC,
  TodolistDomainType
} from "./Bll/Reducers/todolistReducer";
import {addTaskTC, removeTaskTC, updateTaskStatusTC, updateTaskTitleTC} from "./Bll/Reducers/taskReducer";
import {FilterValuesType, TaskStatuses, TaskType} from "./Api/todolist-api";
import {useAppDispatch} from "./Bll/state/hooks";

export type TasksType = {
  [key: string]: Array<TaskType>
}


function MenuIcon() {
  return null;
}

function App() {


  const todoList = useSelector<RootState, Array<TodolistDomainType>>(state => state.todoList)
  const tasks = useSelector<RootState, TasksType>(state => state.tasks)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchTodolistsTC())
  }, [dispatch])

  const addToDoList = useCallback ( (title: string) => {
    dispatch(createTodolistTC(title))
  },[dispatch])

  const removeTask = useCallback( (todoListId: string, taskId: string) => {
    dispatch(removeTaskTC(todoListId, taskId))
  }, [dispatch])

  const addTask = useCallback((todoListId: string, title: string) => {
    dispatch(addTaskTC(todoListId, title))
  }, [dispatch])

  const changeTaskStatus = useCallback((todoListId: string, taskId: string, status: TaskStatuses) => {
    dispatch(updateTaskStatusTC(todoListId, taskId, status))
  },[dispatch])

  const changeTodolistFilter = useCallback((todoListId: string, value: FilterValuesType) => {
    dispatch(changeTodolistFilterAC(todoListId, value))
  },[dispatch])

  const removeTodoList = useCallback((todoListId: string) => {
   dispatch(removeTodolistTC(todoListId))
  }, [dispatch])

  const onChangeInputValue = useCallback((todoListId: string, taskId: string, inputValue: string) => {
    dispatch(updateTaskTitleTC(todoListId, taskId, inputValue))
  },[dispatch])

  const onChangeTodoListTitle = useCallback((todoListId: string, changeValueToDoTitle: string) => {
    dispatch(changeTodolistTitleTC(todoListId, changeValueToDoTitle))
  },[dispatch])

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
            <MenuIcon/>
          </IconButton>
          <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
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
                            tasks={tasks[t.id]}
                            removeTask={removeTask}
                            changeFilter={changeTodolistFilter}
                            addTask={addTask}
                            changeTaskStatus={changeTaskStatus}
                            removeTodoList={removeTodoList}
                            filter={t.filter}
                            onChangeInputValue={onChangeInputValue}
                            onChangeTodoListTitle={onChangeTodoListTitle}
                  />
                </Paper>
              </Grid>
            )
          })}
        </Grid>
      </Container>
    </div>
  );
}

export default App;
