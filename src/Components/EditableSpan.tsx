import React, {ChangeEvent, useCallback, useState} from "react";
import {Input} from "@mui/material";




type EditableSpanType = {
  callBack: (value: string) => void
  title: string
  disabled?: boolean
}

export const EditableSpan = React.memo((props: EditableSpanType) => {

  let [editMode, setEditMode] = useState(false)
  let [inputValue, setInputValue] = useState(props.title)

  const onClickDoubleHandler = () => {
    !props.disabled && setEditMode(!editMode)
  }
  const changeTaskValue = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value)
    props.callBack(e.currentTarget.value)
  },[props])
  return (
    <>
      {!editMode ? <span style={{marginRight: '10px'}} onDoubleClick={onClickDoubleHandler}>{props.title}</span> : <Input onChange={changeTaskValue} value={inputValue} onBlur={onClickDoubleHandler} autoFocus type="text"/>}
    </>
  )
})