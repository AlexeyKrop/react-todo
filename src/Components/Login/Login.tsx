import React from 'react';
import {FormikProvider, useFormik} from 'formik';
import TextField from '@mui/material/TextField/TextField';
import FormGroup from '@mui/material/FormGroup/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel/FormControlLabel';
import Checkbox from '@mui/material/Checkbox/Checkbox';
import Button from '@mui/material/Button/Button';
import Grid from '@mui/material/Grid/Grid';
import {Box} from "@mui/material";
import {loginTC} from "../../Bll/Reducers/authReducer";
import {useAppDispatch, useAppSelector} from "../../Bll/state/hooks";
import {Navigate} from 'react-router-dom';

const Login = () => {
  const isLogin = useAppSelector(state => state.auth.isLogin)
  const dispatch = useAppDispatch()
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false
    },
    onSubmit: values => {
      dispatch(loginTC(values));
    },
  });

  if (isLogin) {
    return <Navigate to="/react-todo"/>
  }
  return (
    <>

      <Box sx={{flexGrow: 1}}>
        <Grid container justifyContent="center" marginTop='100px'>
          <Grid item xs={4}>
            <form onSubmit={formik.handleSubmit}>
              <FormGroup>
                <FormikProvider value={formik}>
                  <TextField
                    {...formik.getFieldProps('email')}
                    id="email"
                    name="email"
                    type="email" label="email" variant="standard"/>
                  <TextField
                    {...formik.getFieldProps('password')}
                    id="password"
                    name="password"
                    type="password" label="password" variant="standard"/>
                  <FormControlLabel control={<Checkbox {...formik.getFieldProps('rememberMe')} name="rememberMe"/>}
                                    label="remember me"/>
                  <Button type="submit" variant="contained">Submit</Button>
                </FormikProvider>
              </FormGroup>
            </form>
          </Grid>
        </Grid>
      </Box>


    </>


  );
};
export default Login