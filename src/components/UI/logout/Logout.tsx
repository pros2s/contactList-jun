import { FC } from 'react';
import { RiLogoutCircleRLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';

import './logout.scss';


const Logout: FC = () => {
  return (
    <Link data-text='logout' className='logout' to='/login'>
      <RiLogoutCircleRLine/>
    </Link>
  );
};


export default Logout;
