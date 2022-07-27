import React, {ChangeEvent, useCallback} from 'react';
import {EditableSpan} from "./EditableSpan";


import {TaskStatuses} from "../Api/todolist-api";
import Checkbox from '@mui/material/Checkbox';
import IconButton from "@mui/material/IconButton/IconButton";
import {Delete} from '@mui/icons-material';
import {RequestStatusType} from "../Bll/Reducers/appReducer";


type TaskPropsType = {
  removeTask: (todoListId: string, taskId: string) => void
  changeTaskStatus: (todoListId: string, taskId: string, status: TaskStatuses) => void
  onChangeInputValue: (todoListId: string, taskId: string, changeInputValue: string) => void
  todoListId: string
  task:  any
  entityStatus: RequestStatusType
}
const Tasks = React.memo((props: TaskPropsType) => {
  const onClickHandler = useCallback(() => props.removeTask(props.todoListId, props.task.id),[props])
  const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    props.changeTaskStatus(props.todoListId, props.task.id, e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New);
  },[ props])

  const onChangeInputValue = useCallback((inputValue: string) => {
    props.onChangeInputValue(props.todoListId, props.task.id, inputValue)
  },[props])

  return <div className={props.task.status === TaskStatuses.Completed ? "is-done" : ""}>
    <Checkbox onChange={onChangeHandler} checked={props.task.status === TaskStatuses.Completed}/>
  <EditableSpan disabled={props.entityStatus === "loading"} callBack={onChangeInputValue} title={props.task.title}/>
  <IconButton disabled={props.task.isDisabled}  onClick={onClickHandler} aria-label="delete" size="large">
    <Delete/>
  </IconButton>
</div>
});

export default Tasks;