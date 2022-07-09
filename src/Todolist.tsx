import React, {useCallback, useEffect} from 'react';
import {AddItemForm} from "./Components/AddItemForm";
import {EditableSpan} from "./Components/EditableSpan";

import Tasks from "./Components/Tasks";

import {FilterValuesType, TaskStatuses, TaskType} from "./Api/todolist-api";
import {useAppDispatch} from "./Bll/state/hooks";
import {fetchTasksTC} from "./Bll/Reducers/taskReducer";
import {RequestStatusType} from "./Bll/Reducers/appReducer";
import IconButton from '@mui/material/IconButton/IconButton';
import { Delete } from '@mui/icons-material';
import Button from '@mui/material/Button/Button';



type PropsType = {
  todoListId: string
  title: string
  tasks: Array<TaskType>
  removeTask: (todoListId: string, taskId: string) => void
  changeFilter: (todoListId: string, value: FilterValuesType) => void
  addTask: (todoListId: string, title: string) => void
  changeTaskStatus: (todoListId: string, taskId: string, status: TaskStatuses) => void
  removeTodoList: (todoListId: string) => void
  filter: string
  onChangeInputValue: (todoListId: string, taskId: string, changeInputValue: string) => void
  onChangeTodoListTitle: (todoListId: string, value: string) => void
  entityStatus: RequestStatusType
}


export const Todolist = React.memo((props: PropsType) => {
  const dispatch = useAppDispatch()

  useEffect(()=> {
    dispatch(fetchTasksTC(props.todoListId))
  }, [dispatch])

  let tasksForTodolist = props.tasks;
  if (props.filter === "active") {
    tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.New);
  }
  if (props.filter === "completed") {
    tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.Completed);
  }

  const addTask = useCallback ((title: string) => {
    if (title.trim() !== "") {
      props.addTask(props.todoListId, title.trim());
    }
  },[props])

  const onAllClickHandler = useCallback(() => props.changeFilter(props.todoListId, "all"),[props]);

  const onActiveClickHandler = useCallback(() => props.changeFilter(props.todoListId, "active"),[props]);

  const onCompletedClickHandler = useCallback(() => props.changeFilter(props.todoListId, "completed"),[props]);

  const onClickRemoveTodoListHandler = useCallback((todoListId: string) => {
    props.removeTodoList(todoListId)
  }, [props])

  const onChangeInputValue = useCallback( (inputValue: string) => {
    props.onChangeTodoListTitle(props.todoListId, inputValue)
  },[props])

  return <div>
    <h3>
      <EditableSpan callBack={onChangeInputValue} title={props.title}/>
      <IconButton onClick={() => onClickRemoveTodoListHandler(props.todoListId)} disabled={props.entityStatus === "loading"} aria-label="delete" size="large">
        <Delete/>
      </IconButton>
    </h3>
    <AddItemForm addTask={addTask} entityStatus={props.entityStatus}/>
    <div style={{listStyleType: 'none', padding: 0}}>
      {
        tasksForTodolist.map(t => {
          return(
            <Tasks key={t.id} todoListId={props.todoListId} removeTask={props.removeTask} changeTaskStatus={props.changeTaskStatus} onChangeInputValue={props.onChangeInputValue} task={t} />
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


