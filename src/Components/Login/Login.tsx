import React from 'react';
import {Field, FormikProvider, useFormik} from 'formik';
import TextField from '@mui/material/TextField/TextField';

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
    <FormikProvider value={formik}>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="email">Email Address</label>
        <TextField onChange={formik.handleChange}
                   value={formik.values.email} id="email"
                   name="email"
                   type="email" label="email" variant="standard"/>
        <TextField onChange={formik.handleChange}
                   value={formik.values.password} id="password"
                   name="password"
                   type="password" label="password" variant="standard"/>
        <label>
          <Field type="checkbox" name="rememberMe"/>

        </label>
        <button type="submit">Submit</button>
      </form>
    </FormikProvider>
  );
};
export default Login