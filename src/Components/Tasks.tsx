import React, {ChangeEvent, useCallback} from 'react';
import {Checkbox} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton";
import {Delete} from "@mui/icons-material";
import {TaskStatuses, TaskType} from "../Api/todolist-api";

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

  return <div className={props.task.completed ? "is-done" : ""}>
    <Checkbox onChange={onChangeHandler} checked={props.task.completed}/>
  <EditableSpan callBack={onChangeInputValue} title={props.task.title}/>
  <IconButton onClick={onClickHandler} aria-label="delete" size="large">
    <Delete/>
  </IconButton>
</div>
});

export default Tasks;