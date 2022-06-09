import React, {useCallback, useReducer} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./Components/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC,
  todolistReducer
} from "./Bll/Reducers/todolistReducer";
import {
  addTaskAC,
  changeTaskStatusAC,
  onChangeInputValueAC,
  removeTaskAC,
  taskReducer
} from "./Bll/Reducers/taskReducer";

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

function AppWithReducers() {
  let todoListID_1 = v1()
  let todoListID_2 = v1()
  let [todoList, dispatchToTodolistReducer] = useReducer(todolistReducer, [
    {
      id: todoListID_1,
      title: 'What to Learn',
      filter: 'all'
    },
    {
      id: todoListID_2,
      title: 'What to bue',
      filter: 'all'
    },
  ])
  let [tasks, dispatchToTaskReducer] = useReducer(taskReducer, {
    [todoListID_1]: [
      {id: v1(), title: "HTML&CSS", isDone: true},
      {id: v1(), title: "JS", isDone: true},
      {id: v1(), title: "ReactJS", isDone: false},
      {id: v1(), title: "Rest API", isDone: false},
      {id: v1(), title: "GraphQL", isDone: false},
    ],
    [todoListID_2]: [
      {id: v1(), title: "milk", isDone: true},
      {id: v1(), title: "solt", isDone: true},
      {id: v1(), title: "beer", isDone: false},
      {id: v1(), title: "juice", isDone: false},
      {id: v1(), title: "cola", isDone: false},
    ],
  })

  const addToDoList = useCallback ((title: string) => {
    let todolistId = v1();
    dispatchToTaskReducer(addTodolistAC(todolistId, title))
    dispatchToTodolistReducer(addTodolistAC(todolistId, title))
  },[])

  function removeTask(todoListId: string, taskId: string) {
    dispatchToTaskReducer(removeTaskAC(todoListId, taskId))
  }

  function addTask(todoListId: string, title: string) {
    dispatchToTaskReducer(addTaskAC(todoListId, title))
  }

  function changeTaskStatus(todoListId: string, taskId: string, isDone: boolean) {
    dispatchToTaskReducer(changeTaskStatusAC(todoListId, taskId, isDone))
  }


  function changeFilter(todoListId: string, value: FilterValuesType) {
    dispatchToTodolistReducer(changeTodolistFilterAC(todoListId, value))
  }

  function removeTodoList(todoListId: string) {
    dispatchToTodolistReducer(removeTodolistAC(todoListId))
    dispatchToTaskReducer(removeTodolistAC(todoListId))
  }

  function onChangeInputValue(todoListId: string, taskId: string, inputValue: string) {
    dispatchToTaskReducer(onChangeInputValueAC(todoListId, taskId, inputValue))
  }

  function onChangeTodoListTitle(todoListId: string, changeValueToDoTitle: string) {
    dispatchToTodolistReducer(changeTodolistTitleAC(todoListId, changeValueToDoTitle))
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
                            changeFilter={changeFilter}
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

// export default AppWithReducers;
