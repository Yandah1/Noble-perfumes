import React from 'react'
import Image from 'next/image';

export default function AboutUsPage() {
  return (
    <div className='flex flex-col items-center gap-10 py-10'>
        <div className='max-w-max flex flex-col sm:flex-row'>
            <div className=''>

                <Image objectFit="cover" style={{width: '300px', height: '300px'}} alt='Backend: Sis Yandah' src="/images/backend.jpg" width={300} height={300} />
                <div>
                    <h1 className='text-bold'>Yandah Khanyile: Backend</h1>
                </div>
            </div>

            <div className='mt-5 ml-0 sm:mt-0 sm:ml-5'>
                <Image objectFit="scale-down" style={{width: '300px', height: '300px'}} alt='Frontend: Buti Tumi' src="/images/frontend.png" width={300} height={300} />
                <div>
                    <h1 className='text-bold'>Itumeleng Malgas: Frontend</h1>
                </div>
            </div>
        </div>
        
        <div className='ml-5 w-1/2'>
            <h1 className='leading-tight text-2xl text-center'>Contact Us</h1>
            <hr/>
            <p className='text-center'>Email: admin@nobleperfumes.store</p>
            <p className='text-center'>Phone: 063 688 4547/072 526 4856</p>
        </div>
    </div>
  )
}
