import React from 'react'
import Image from 'next/image';

export default function AboutUsPage() {
  return (
    <div className='flex flex-col lg:flex-row justify-between py-10'>
        <div>
            <div className='mb-3 border flex gap-3'>
                <div>
                    <h1 className='text-bold'>Yandah Khanyile: Backend</h1>
                    <p>Skills:</p>
                </div>
                <Image alt='Backend: Sis Yandah' src="/images/backend.jpg" width={300} height={300} />
            </div>

            <div className='border'>
                <p>For Buti Itu: The Frontend guy</p>
                <Image alt='Frontend: Buti Itu' src="/images/frontend.png" width={300} height={300} />
            </div>
        </div>
        
        <div>
            <h1 className=''>Contact Us</h1>
        </div>
    </div>
  )
}
