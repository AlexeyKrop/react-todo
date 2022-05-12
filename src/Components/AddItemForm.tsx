import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, Icon, Input} from "@mui/material";

type AddItemFormType = {
  addTask: (title: string) => void
}

export function AddItemForm(props: AddItemFormType) {
  let [title, setTitle] = useState("")
  let [error, setError] = useState<string | null>(null)
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setTitle(e.currentTarget.value)
  }
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.key === 'Enter' && title.trim() !== "") {
      props.addTask(title);
      setTitle('')
    } else {
      setError("Title is required");
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
      <Button variant="text" size="large" onClick={addTask}>
        <Icon sx={{ fontSize: 30 }}>add_circle</Icon></Button>
      {error && <div className="error-message">{error}</div>}
    </div>
  )
}