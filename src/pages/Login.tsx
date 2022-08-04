import { FC, useEffect } from 'react';

import * as yup from 'yup';
import { ErrorMessage, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useTypedDispatch } from '../hooks/useTypedDispatch';
import { falseAutorization, trueAutorization } from '../store/slices/isAutorized';

interface LoginForm {
  emailInput: string;
  passwordInput: string;
}

const Login: FC = () => {
  const route = useNavigate();
  const dispatch = useTypedDispatch();

  useEffect(() => {
    dispatch(falseAutorization());
  }, [dispatch]);

  const formValidation = yup.object({
    emailInput: yup
      .string()
      .required('Not required')
      .matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Not valid email adress'),

    passwordInput: yup.string().required('Not required').min(4, 'Minimum 4 symbols'),
  });

  return (
    <Formik<LoginForm>
      initialValues={{
        emailInput: '',
        passwordInput: '',
      }}
      validationSchema={formValidation}
      onSubmit={(_, { resetForm }) => {
        route(`/contacts`);
        dispatch(trueAutorization());
        resetForm();
      }}>
      {({ handleSubmit, values, handleChange }) => (
        <div>
          <form onSubmit={handleSubmit}>
            <input
              maxLength={30}
              type='email'
              name='emailInput'
              value={values.emailInput.trim()}
              onChange={handleChange}
            />
            <ErrorMessage component='div' name='emailInput' />

            <input
              maxLength={30}
              type='password'
              name='passwordInput'
              value={values.passwordInput.trim()}
              onChange={handleChange}
            />
            <ErrorMessage component='div' name='passwordInput' />

            <button type='submit'>log in</button>
          </form>
        </div>
      )}
    </Formik>
  );
};


export default Login;
