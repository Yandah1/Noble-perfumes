import React from 'react'
import RootHeader from '../(root)/LayoutComponents/RootHeader';
import RootFooter from '../(root)/LayoutComponents/RootFooter';

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <div className='min-h-screen flex flex-col'>
        <RootHeader />
          <div className='flex-1 flex py-5 min-w-full flex-col xl:flex-row'>
              <div className='w-full ml-5'>{children}</div>
          </div>
        <RootFooter />
    </div>
  )
}
