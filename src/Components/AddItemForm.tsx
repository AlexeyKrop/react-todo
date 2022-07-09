import Button from "@mui/material/Button/Button";
import Icon from "@mui/material/Icon/Icon";
import Input from "@mui/material/Input/Input";
import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type AddItemFormType = {
  addTask: (title: string) => void
  disabled?: boolean
}

export const AddItemForm = React.memo((props: AddItemFormType) => {
  let [title, setTitle] = useState("")
  let [error, setError] = useState<string | null>(null)
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (error) {
      setError(null);
    }
    setTitle(e.currentTarget.value)
  }
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (error) {
      setError(null);
    }
    if (e.key === 'Enter' && title.trim() !== "") {
      props.addTask(title);
      setTitle('')
    }
  }
  const addTask = () => {
    if (title.trim() !== "") {
      props.addTask(title.trim());
    } else {
      setError("Title is required");
    }
    setTitle('')
  }
  return (
    <div>
      <Input value={title}
             onChange={onChangeHandler}
             onKeyPress={onKeyPressHandler}
             error={!!error}
      />
      <Button disabled={props.disabled} variant="text" size="large" onClick={addTask}>
        <Icon sx={{fontSize: 30}}>add_circle</Icon></Button>
      {error && <div className="error-message">{error}</div>}
    </div>
  )
})