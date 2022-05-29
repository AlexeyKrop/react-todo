import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./Components/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";

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
  let [todoList, setTodoList] = useState<Array<TodoListType>>([
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
  let [tasks, setTasks] = useState<TasksType>({
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
  const addToDoList = (title: string) => {
    let toDiListID = v1();
    let newToDoList: TodoListType = {
      id: toDiListID,
      title: title,
      filter: "all",
    }
    setTodoList([newToDoList, ...todoList])
    setTasks({
      ...tasks,
      [toDiListID]: []
    })
  }
  function removeTask(todoListId: string, taskId: string) {
    setTasks({...tasks, [todoListId]: tasks[todoListId].filter(t => t.id !== taskId)})
  }

  function addTask(todoListId: string, title: string) {
    let newTask = {id: v1(), title: title, isDone: false};
    setTasks({...tasks, [todoListId]: [newTask, ...tasks[todoListId]]})
  }

  function changeStatus(todoListId: string, taskId: string, isDone: boolean) {
    setTasks({...tasks, [todoListId]: tasks[todoListId].map(t => t.id === taskId ? {...t, isDone} : t)})
  }


  function changeFilter(todoListId: string, value: FilterValuesType) {
    setTodoList(todoList.map(t => t.id === todoListId ? {...t, filter: value} : t))
  }

  function removeTodoList(todoListId: string) {
    setTodoList(todoList.filter(t => t.id !== todoListId))
    delete tasks[todoListId]
  }

  const onChangeInputValue = (todoListId: string, taskId: string, inputValue: string) => {
    setTasks(
      {
        ...tasks,
        [todoListId]: tasks[todoListId].map(t => t.id === taskId ? {...t, title: inputValue} : t)
      }
    )
  }
  const onChangeTodoListTitle = (todoListId: string, changeValueToDoTitle: string) => {
    setTodoList(
      todoList.map(t => t.id === todoListId ? {...t, title: changeValueToDoTitle} : t)
    )
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
                            changeTaskStatus={changeStatus}
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

export default AppWithReducers;
