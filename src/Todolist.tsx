import React, {ChangeEvent, useCallback} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from "./Components/AddItemForm";
import {EditableSpan} from "./Components/EditableSpan";
import {Button, Checkbox} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import {Delete} from "@mui/icons-material";
import Task from "./Components/Task";

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


export const Todolist = React.memo((props: PropsType) => {
  let tasksForTodolist = props.tasks;
  if (props.filter === "active") {
    tasksForTodolist = props.tasks.filter(t => !t.isDone);
  }
  if (props.filter === "completed") {
    tasksForTodolist = props.tasks.filter(t => t.isDone);
  }

  const addTask = useCallback ((title: string) => {
    if (title.trim() !== "") {
      props.addTask(props.todoListId, title.trim());
    }
  },[props.addTask, props.todoListId])

  const onAllClickHandler = useCallback(() => props.changeFilter(props.todoListId, "all"),[props.changeFilter,props.todoListId]);

  const onActiveClickHandler = useCallback(() => props.changeFilter(props.todoListId, "active"),[props.changeFilter,props.todoListId]);

  const onCompletedClickHandler = useCallback(() => props.changeFilter(props.todoListId, "completed"),[props.changeFilter,props.todoListId]);

  const onClickRemoveTodoListHandler = (todoListId: string) => {
    props.removeTodoList(todoListId)
  }

  const onChangeInputValue = useCallback( (inputValue: string) => {
    props.onChangeTodoListTitle(props.todoListId, inputValue)
  },[props.onChangeTodoListTitle,props.todoListId])

  return <div>
    <h3>
      <EditableSpan callBack={onChangeInputValue} title={props.title}/>
      <Button onClick={() => onClickRemoveTodoListHandler(props.todoListId)} variant="outlined" startIcon={<Delete />}>
        Delete
      </Button>
    </h3>
    <AddItemForm addTask={addTask}/>
    <div style={{listStyleType: 'none', padding: 0}}>
      {
        tasksForTodolist.map(t => {
          return(
            <Task key={t.id} todoListId={props.todoListId} removeTask={props.removeTask} changeTaskStatus={props.changeTaskStatus} onChangeInputValue={props.onChangeInputValue} task={t} />
          )
        })
      }
    </div>
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
})


