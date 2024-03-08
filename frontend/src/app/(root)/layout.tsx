import SloganPage from '@/components/SloganPage/page';
import React from 'react'
import RootHeader from './LayoutComponents/RootHeader';
import RootFooter from './LayoutComponents/RootFooter';
import Link from 'next/link';

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <div className='min-h-screen flex flex-col'>
        <RootHeader />
          <div className='flex-1 flex py-5 min-w-full flex-col xl:flex-row'>
              <div className='mb-5 lg:min-w-max'>
                {<SloganPage />}
              </div>
              <div className='w-full ml-5'>{children}</div>
          </div>
        <RootFooter />
    </div>
  )
}
