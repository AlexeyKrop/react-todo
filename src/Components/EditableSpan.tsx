import React, {ChangeEvent, useCallback, useState} from "react";
import {Input} from "@mui/material";




type EditableSpanType = {
  callBack: (value: string) => void
  title: string
}

export const EditableSpan = React.memo((props: EditableSpanType) => {
  let [editMode, setEditMode] = useState(false)
  let [inputValue, setInputValue] = useState(props.title)
  const onClickDoubleHandler = () => {
    setEditMode(!editMode)
  }
  const changeTaskValue = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value)
    props.callBack(e.currentTarget.value)
  },[props.callBack])
  return (
    <>
      {!editMode ? <span style={{marginRight: '10px'}} onDoubleClick={onClickDoubleHandler}>{props.title}</span> : <Input onChange={changeTaskValue} value={inputValue} onBlur={onClickDoubleHandler} autoFocus type="text"/>}
    </>
  )
})