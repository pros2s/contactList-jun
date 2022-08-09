import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import * as yup from 'yup';
import { Form, Formik } from 'formik';
import { trueAutorization } from '../../store/slices/isAutorized';
import { fetchContactsSelector, setCurrentPage } from '../../store/slices/fetchContacts';

import { useTypedDispatch } from '../../hooks/useTypedDispatch';
import { useTypedSelector } from '../../hooks/useTypedSelector';

import InputWithError from '../UI/inputWithError/InputWithError';

import './login.scss';


interface LoginForm {
  emailInput: string;
  passwordInput: string;
}

const Login: FC = () => {
  const route = useNavigate();
  const dispatch = useTypedDispatch();
  const { totalPages } = useTypedSelector(fetchContactsSelector);


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
        route(`/contacts/1`);
        dispatch(trueAutorization());
        dispatch(setCurrentPage(totalPages.toString()));
        resetForm();
      }}>
      {({ handleSubmit, values, handleChange }) => (
        <div className='login'>
          <Form className='login__form' onSubmit={handleSubmit}>
            <h1 className='login__title'>Log in</h1>
            <InputWithError
              className='login__text'
              maxLength={30}
              type='email'
              name='emailInput'
              placeholder='your email'
              value={values.emailInput.trim()}
              onChange={handleChange}
            />

            <InputWithError
              className='login__text'
              maxLength={30}
              type='password'
              name='passwordInput'
              placeholder='your password'
              value={values.passwordInput.trim()}
              onChange={handleChange}
            />

            <button className='login__submit' type='submit'>
              Let's go
            </button>
          </Form>
        </div>
      )}
    </Formik>
  );
};


export default Login;
