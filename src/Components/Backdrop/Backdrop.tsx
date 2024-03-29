import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import {useAppSelector} from "../../Bll/state/hooks";
import {selectApp} from "../../Bll/Reducers/appReducer";


export const SimpleBackdrop = () => {
  const {isLoad} = useAppSelector(selectApp)
  return (
    <div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoad}
      >
        <CircularProgress />
      </Backdrop>
    </div>
  );
}
