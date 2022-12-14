import { FC } from 'react';

import './error.scss';
import error from '../../../../assets/error.png';
import { RiLoginBoxLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';


interface ErrorProps {
  message: string
}

const Error: FC<ErrorProps> = ({ message }) => {
  const navigate = useNavigate();


  return (
    <div data-testid='error' className='fetch-error'>
      <img className='fetch-error__img' src={error} alt='error message' />
      <h1 className='fetch-error__title'>{message}</h1>
      <div data-testid='errorGoBack' className="fetch-error__to-login">
        <p>You can go back to login page</p>
        <RiLoginBoxLine data-testid='errorGoBackSVG' onClick={() => navigate('/login')} />
      </div>
    </div>
  );
};


export default Error;
