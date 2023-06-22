import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/client';
import { REGISTER_USER } from '../../API';

const SignupSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
});

const RegistrationForm: React.FC = () => {
  const [res, setRes] = useState(null);
  const [registerUser, { error }] = useMutation(REGISTER_USER);
  const initialValues = {
    email: '',
    password: '',
  };

  const handleSubmit = async (values: { email: string; password: string }) => {
    const { data } = await registerUser({ variables: { user: { ...values } } });
    setRes(data.createUser.email);
    return data.createUser.email;
  };

  return (
    <>
      {res && <h1>Корустувача {res} успішно зареєстровано! Будь-ласка увійдіть!</h1>}
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

export default RegistrationForm;
