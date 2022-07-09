import React, {ChangeEvent, useCallback} from 'react';
import {EditableSpan} from "./EditableSpan";


import {TaskStatuses, TaskType} from "../Api/todolist-api";
import Checkbox from '@mui/material/Checkbox';
import IconButton from "@mui/material/IconButton/IconButton";
import { Delete } from '@mui/icons-material';


type TaskPropsType = {
  removeTask: (todoListId: string, taskId: string) => void
  changeTaskStatus: (todoListId: string, taskId: string, status: TaskStatuses) => void
  onChangeInputValue: (todoListId: string, taskId: string, changeInputValue: string) => void
  todoListId: string
  task: TaskType
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
  <EditableSpan callBack={onChangeInputValue} title={props.task.title}/>
  <IconButton onClick={onClickHandler} aria-label="delete" size="large">
    <Delete/>
  </IconButton>
</div>
});

export default Tasks;