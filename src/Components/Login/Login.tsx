import React from 'react';
import {FormikProvider, useFormik} from 'formik';
import TextField from '@mui/material/TextField/TextField';
import FormGroup from '@mui/material/FormGroup/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel/FormControlLabel';
import Checkbox from '@mui/material/Checkbox/Checkbox';
import FormControl from '@mui/material/FormControl/FormControl';
import Button from '@mui/material/Button/Button';
import Grid from '@mui/material/Grid/Grid';

const Login = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <>
      <Grid container justifyContent="center" direction="row"
            alignItems="center">
        <Grid item xs={12}>
          <form onSubmit={formik.handleSubmit}>
            <FormControl>
              <FormGroup>
                <FormikProvider value={formik}>
                  <label htmlFor="email">Email Address</label>
                  <TextField onChange={formik.handleChange}
                             value={formik.values.email} id="email"
                             name="email"
                             type="email" label="email" variant="standard"/>
                  <TextField onChange={formik.handleChange}
                             value={formik.values.password} id="password"
                             name="password"
                             type="password" label="password" variant="standard"/>
                  <FormControlLabel control={<Checkbox {...formik.getFieldProps('rememberMe')} name="rememberMe"/>}
                                    label="remember me"/>
                  <Button type="submit" variant="contained">Submit</Button>
                </FormikProvider>
              </FormGroup>
            </FormControl>
          </form>
        </Grid>
      </Grid>


    </>


  );
};
export default Login