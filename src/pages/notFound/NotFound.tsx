import { FC } from 'react';

import { RiArrowGoBackLine, RiLoginBoxLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

import './error.scss';


const NotFound: FC = () => {
  const navigate = useNavigate();


  return (
    <div className='error'>
      <p className='error__type'>404</p>
      <p className='error__name'>Page not found</p>
      <div className='error__footer'>
        <div className='error__footer-back'>
          <p>You can go back</p>
          <RiArrowGoBackLine onClick={() => navigate(-1)}/>
        </div>

        <div className='error__footer-login'>
          <p>or to login page</p>
          <RiLoginBoxLine onClick={() => navigate('login')}/>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
