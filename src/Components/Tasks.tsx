import React, {ChangeEvent, useCallback} from 'react';
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
const Tasks = React.memo((props: TaskPropsType) => {
  const onClickHandler = useCallback(() => props.removeTask(props.todoListId, props.task.id),[props.todoListId, props.task.id])
  const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    props.changeTaskStatus(props.todoListId, props.task.id, e.currentTarget.checked);
  },[ props.changeTaskStatus,props.todoListId, props.task.id])
  const onChangeInputValue = useCallback((inputValue: string) => {
    props.onChangeInputValue(props.todoListId, props.task.id, inputValue)
  },[props.onChangeInputValue,props.todoListId, props.task.id])
  return <div className={props.task.isDone ? "is-done" : ""}>
    <Checkbox
  onChange={onChangeHandler}
  checked={props.task.isDone}/>
  <EditableSpan callBack={onChangeInputValue} title={props.task.title}/>
  <IconButton onClick={onClickHandler} aria-label="delete" size="large">
    <Delete/>
  </IconButton>
</div>
});

export default Tasks;