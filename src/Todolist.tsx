import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from "./Components/AddItemForm";
import {EditableSpan} from "./Components/EditableSpan";
import {Button, Checkbox} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import {Delete} from "@mui/icons-material";


type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type PropsType = {
  todoListId: string
  title: string
  tasks: Array<TaskType>
  removeTask: (todoListId: string, taskId: string) => void
  changeFilter: (todoListId: string, value: FilterValuesType) => void
  addTask: (todoListId: string, title: string) => void
  changeTaskStatus: (todoListId: string, taskId: string, isDone: boolean) => void
  removeTodoList: (todoListId: string) => void
  filter: string
  onChangeInputValue: (todoListId: string, taskId: string, changeInputValue: string) => void
  onChangeTodoListTitle: (todoListId: string, value: string) => void
}


export function Todolist(props: PropsType) {
  const addTask = (title: string) => {
    if (title.trim() !== "") {
      props.addTask(props.todoListId, title.trim());
    }
  }
  const onAllClickHandler = () => props.changeFilter(props.todoListId, "all");
  const onActiveClickHandler = () => props.changeFilter(props.todoListId, "active");
  const onCompletedClickHandler = () => props.changeFilter(props.todoListId, "completed");
  const onClickRemoveTodoListHandler = (todoListId: string) => {
    props.removeTodoList(todoListId)
  }
  const onChangeInputValue = (inputValue: string) => {
    props.onChangeTodoListTitle(props.todoListId, inputValue)
  }
  return <div>
    <h3>
      <EditableSpan callBack={onChangeInputValue} title={props.title}/>
      <Button onClick={() => onClickRemoveTodoListHandler(props.todoListId)} variant="outlined" startIcon={<Delete />}>
        Delete
      </Button>
      {/*<IconButton onClick={() => onClickRemoveTodoListHandler(props.todoListId)} aria-label="delete" size="large">*/}
      {/*  <Delete/>*/}
      {/*</IconButton>*/}
    </h3>
    <AddItemForm addTask={addTask}/>
    <ul style={{listStyleType: 'none', padding: 0}}>
      {
        props.tasks.map(t => {
          const onClickHandler = () => props.removeTask(props.todoListId, t.id)
          const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(props.todoListId, t.id, e.currentTarget.checked);
          }
          const onChangeInputValue = (inputValue: string) => {
            props.onChangeInputValue(props.todoListId, t.id, inputValue)
          }
          return <li key={t.id} className={t.isDone ? "is-done" : ""}>
            <Checkbox
              onChange={onChangeHandler}
              checked={t.isDone}/>
            <EditableSpan callBack={onChangeInputValue} title={t.title}/>
            <IconButton onClick={onClickHandler} aria-label="delete" size="large">
              <Delete/>
            </IconButton>
          </li>
        })
      }
    </ul>
    <div>
      <Button variant={props.filter === 'all' ? "contained" : "text"}
              onClick={onAllClickHandler}>All
      </Button>
      <Button color={"success"} variant={props.filter === 'active' ? "contained" : "text"}
              onClick={onActiveClickHandler}>Active
      </Button>
      <Button color={"secondary"} variant={props.filter === 'completed' ? "contained" : "text"}
              onClick={onCompletedClickHandler}>Completed
      </Button>
    </div>
  </div>
}


