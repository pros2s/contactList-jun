import { FC, memo } from 'react';
import {  RotatingLines } from  'react-loader-spinner'

import './loader.scss';


interface LoaderProps {
  info: string;
}

const Loader: FC<LoaderProps> = memo(({ info }) => {
  return (
    <div className='loader'>
      <RotatingLines
        strokeColor="white"
        strokeWidth="5"
        width="60"
        visible={true}
      />
      <h3>{info}...</h3>
    </div>
  )
})


export default Loader;
