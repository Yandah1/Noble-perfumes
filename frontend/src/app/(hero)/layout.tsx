import React from 'react';
import HeroHeader from './HeroHeader';
import HeroFooter from './HeroFooter';

export default function HeroLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <div className='min-h-screen flex flex-col absolute inset-0 px-5' style={{ backgroundImage: `url(images/Picture2.png)`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        
        {/* Overlay */}
        <div className='absolute inset-0 bg-black opacity-50 z-1'></div>
      <HeroHeader />
      <div className='flex-1 flex py-5 min-w-full flex-col xl:flex-row'>
        <div className='w-full'>
          {/* Hero Section */}
          <div className='flex justify-center items-center flex-col h-full text-center text-white'>
            <h1 className='text-4xl font-bold mb-4 z-10'>Elevate your scents, Embrace the noble Essence</h1>
            <p className='w-96 text-lg mb-6'>Discover luxury fragrances & beauty essentials. Shop now for curated collections of perfumes. Experience elegance & prestige.</p>
            <button className='z-10 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded'>
              Explore More
            </button>
          </div>
        </div>
      </div>
      <HeroFooter />
    </div>
  );
}
