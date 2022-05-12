import React, {ChangeEvent, useState} from "react";

type EditableSpanType = {
  callBack: (value: string) => void
  title: string
}

export function EditableSpan(props: EditableSpanType) {
  let [editMode, setEditMode] = useState(false)
  let [inputValue, setInputValue] = useState(props.title)
  const onClickDoubleHandler = () => {
    setEditMode(!editMode)
  }
  const changeTaskValue = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value)
    props.callBack(e.currentTarget.value)
  }
  return (
    <>
      {!editMode ? <span onDoubleClick={onClickDoubleHandler}>{props.title}</span> : <input onChange={changeTaskValue} value={inputValue} onBlur={onClickDoubleHandler} autoFocus type="text"/>}
    </>
  )
}