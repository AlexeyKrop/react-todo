import React from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./Components/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./Bll/state/store";
import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC
} from "./Bll/Reducers/todolistReducer";
import {addTaskAC, changeTaskStatusAC, onChangeInputValueAC, removeTaskAC} from "./Bll/Reducers/taskReducer";

export type FilterValuesType = "all" | "active" | "completed";
export type TodoListType = {
  id: string,
  title: string,
  filter: FilterValuesType
}
export type TasksType = {
  [id: string]: Array<{
    id: string,
    title: string,
    isDone: boolean
  }>
}

function MenuIcon() {
  return null;
}

function AppWithRedux() {
  const todoList = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todoList)
  const tasks = useSelector<AppRootStateType, TasksType>(state => state.tasks)
  const dispatch = useDispatch()

  function addToDoList (title: string){
    let toDiListID = v1();
    dispatch(addTodolistAC(toDiListID, title))
  }

  function removeTask(todoListId: string, taskId: string) {
    dispatch(removeTaskAC(todoListId, taskId))
  }

  function addTask(todoListId: string, title: string) {
    dispatch(addTaskAC(todoListId,title))
  }

  function changeTaskStatus(todoListId: string, taskId: string, isDone: boolean) {
    dispatch(changeTaskStatusAC(todoListId, taskId, isDone))
  }

  function changeTodolistFilter(todoListId: string, value: FilterValuesType) {
    dispatch(changeTodolistFilterAC(todoListId, value))
  }

  function removeTodoList(todoListId: string) {
   dispatch(removeTodolistAC(todoListId))
  }

  function onChangeInputValue(todoListId: string, taskId: string, inputValue: string){
    dispatch(onChangeInputValueAC(todoListId, taskId, inputValue))
  }

  function onChangeTodoListTitle(todoListId: string, changeValueToDoTitle: string){
    dispatch(changeTodolistTitleAC(todoListId, changeValueToDoTitle))
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
            let tasksForTodolist = tasks[t.id];
            if (t.filter === "active") {
              tasksForTodolist = tasks[t.id].filter(t => !t.isDone);
            }
            if (t.filter === "completed") {
              tasksForTodolist = tasks[t.id].filter(t => t.isDone);
            }
            return (
              <Grid style={{padding: '20px 0'}} key={t.id}>
                <Paper style={{padding: '20px', marginRight: '10px'}}>
                  <Todolist todoListId={t.id}
                            key={t.id}
                            title={t.title}
                            tasks={tasksForTodolist}
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

export default AppWithRedux;
