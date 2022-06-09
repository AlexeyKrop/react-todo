import React, {ChangeEvent} from 'react';
import {Checkbox} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton";
import {Delete} from "@mui/icons-material";

type TaskPropsType = {
  removeTask: (todoListId: string, taskId: string) => void
  changeTaskStatus: (todoListId: string, taskId: string, isDone: boolean) => void
  onChangeInputValue: (todoListId: string, taskId: string, changeInputValue: string) => void
  todoListId: string
  task: {
    id: string
    isDone: boolean
    title: string
  }
}
const Task = (props: TaskPropsType) => {
  const onClickHandler = () => props.removeTask(props.todoListId, props.task.id)
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    props.changeTaskStatus(props.todoListId, props.task.id, e.currentTarget.checked);
  }
  const onChangeInputValue = (inputValue: string) => {
    props.onChangeInputValue(props.todoListId, props.task.id, inputValue)
  }
  return <div className={props.task.isDone ? "is-done" : ""}>
    <Checkbox
  onChange={onChangeHandler}
  checked={props.task.isDone}/>
  <EditableSpan callBack={onChangeInputValue} title={props.task.title}/>
  <IconButton onClick={onClickHandler} aria-label="delete" size="large">
    <Delete/>
  </IconButton>
</div>
};

export default Task;