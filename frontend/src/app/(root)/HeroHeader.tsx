import React from 'react';
import Link from 'next/link';

const RootHeader: React.FC = () => {

  return (
    <div className='flex justify-between items-center h-3xl py-5'>
      <Link href='/'>
        <div className='flex items-center text-black-400 text-nowrap'>
          <h1 className='text-5xl font-extrabold '>ALX |</h1>
          <h3 className='text-3xl font-extralight text-pink-600 pl-2 z-10'>Noble Perfumes</h3>
        </div>
      </Link>
    </div>
  );
};

export default RootHeader;
