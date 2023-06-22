import { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../API';
import { useNavigate } from 'react-router-dom';

const SignupSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
});

const LoginForm: React.FC = () => {
  const [res, setRes] = useState(null);
  const [loginUser, { error }] = useMutation(LOGIN_USER);

  const navigate = useNavigate();

  useEffect(() => {
    if (res) {
      navigate('/categories');
    }
  });
  const initialValues = {
    email: '',
    password: '',
  };

  const handleSubmit = async (values: { email: string; password: string }) => {
    const { data } = await loginUser({ variables: { input: { ...values } } });
    console.log(data.login.access_token);
    localStorage.setItem('token', data.login.access_token);
    localStorage.setItem('user', data.login.user.email);
    setRes(data);
    return data;
  };

  return (
    <>
      {error && <h1>{error.message}</h1>}
      {!res && (
        <Formik
          initialValues={initialValues}
          validationSchema={SignupSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div>
              <label htmlFor="email">Email:</label>
              <Field type="email" id="email" name="email" />
              <ErrorMessage name="email" component="div" />
            </div>

            <div>
              <label htmlFor="password">Password:</label>
              <Field type="password" id="password" name="password" />
              <ErrorMessage name="password" component="div" />
            </div>

            <button type="submit">Submit</button>
          </Form>
        </Formik>
      )}
    </>
  );
};

export default LoginForm;
