import React from 'react';
import {FormikErrors, useFormik} from 'formik';
import TextField from '@mui/material/TextField/TextField';
import FormGroup from '@mui/material/FormGroup/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel/FormControlLabel';
import Checkbox from '@mui/material/Checkbox/Checkbox';
import Button from '@mui/material/Button/Button';
import Grid from '@mui/material/Grid/Grid';
import {loginTC} from "../../Bll/Reducers/authReducer";
import {useAppDispatch, useAppSelector} from "../../Bll/state/hooks";
import {Navigate} from 'react-router-dom';
import FormLabel from '@mui/material/FormLabel/FormLabel';
import Box from '@mui/material/Box/Box';

const Login = () => {
  const isLogin = useAppSelector(state => state.auth.isLogin)
  const dispatch = useAppDispatch()
  type FormValues = {
    email?: string,
    password?: string,
    rememberMe?: boolean
  }
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false
    },
    validate: values => {
      let errors: FormikErrors<FormValues> = {};
      if (!values.email) {
        errors.email = 'Required';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
      }
      if (!values.password) {
        errors.password = 'Required';
      } else if (values.password.length < 4) {
        errors.password = 'Password should be of minimum 4 characters length'
      }

      return errors;
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
        <Grid container justifyContent="center" alignItems="center" marginTop='100px'>
          <Grid sx={{
            width: 300,
            height: 300,
          }}>
            <form onSubmit={formik.handleSubmit}>
              <FormLabel>
                <p>To log in get registered
                  <a href={'https://social-network.samuraijs.com/'}
                     target={'_blank'}> here
                  </a>
                </p>
                <p>or use common test account credentials:</p>
                <p>Email: free@samuraijs.com</p>
                <p>Password: free</p>
              </FormLabel>
              <FormGroup>
                <TextField
                  id="email"
                  type="email" label="email" variant="standard"
                  helperText={formik.touched.email && formik.errors.email}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  {...formik.getFieldProps('email')}/>
                <TextField
                  id="password"
                  type="password" label="password" variant="standard"
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
                  {...formik.getFieldProps('password')}/>
                <FormControlLabel control={<Checkbox {...formik.getFieldProps('rememberMe')} name="rememberMe"/>}
                                  label="remember me"/>
                <Button type="submit" variant="contained">Submit</Button>

              </FormGroup>
            </form>
          </Grid>
        </Grid>
      </Box>
    </>


  );
};
export default Login