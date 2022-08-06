import { FC, useEffect } from 'react';

import { useTypedDispatch } from '../../hooks/useTypedDispatch';
import { falseAutorization } from '../../store/slices/isAutorized';

import Login from '../../components/login/Login';


const LoginPage: FC = () => {
  const dispatch = useTypedDispatch();

  useEffect(() => {
    dispatch(falseAutorization());
  }, [dispatch]);

  return (
    <Login />
  );
};


export default LoginPage;
