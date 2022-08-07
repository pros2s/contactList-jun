import { FC } from 'react';

import errorMini from '../../../../assets/errorMini.png';

import './errorMini.scss';


interface ErrorMiniProps {
  message: string;
}

const ErrorMini: FC<ErrorMiniProps> = ({ message }) => {
  return (
    <div className='error-mini'>
      <img src={errorMini} alt='error message' />
      <p>{message}</p>
    </div>
  );
};

export default ErrorMini;
