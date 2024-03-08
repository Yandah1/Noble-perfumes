"use client"

import PayFast from '@/components/PayFast/page';
import { setCurrentStep } from '@/redux/slices/stepFormSlice'
import { Button, Flex } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

export default function Payment() {
  const currentStep = useSelector((store: any) => store.stepForm?.currentStep);
  const formData = useSelector((store: any) => store.stepForm?.formData);
  const dispatch = useDispatch();
  
  console.log(formData)
  return (
    <div className='max-w-96'>
        <div className="px-4 sm:px-0">
          <h3 className="text-base font-semibold leading-7 text-gray-500">Order Overview</h3>
          <p className='max-w-2xl text-sm leading-6 text-gray-500'>order#12235</p>
        </div>
        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-pink-900">Ordered Items:</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                <div className='mb-2'>
                  <p>1. Fugiat ipsum ipsum deserunt</p>
                  <span>100ml x3</span>
                </div>
                <hr />

                <div className='mb-2'>
                  <p>2. Fugiat ipsum ipsum</p>
                  <span>100ml x3</span>
                </div>
                <hr />
                <div className='mb-2'>
                  <p>3. Fugiat ipsum ipsum deserunt Fugiat ipsum</p>
                  <span>100ml x3</span>
                </div>
                <hr />
                <b className=''>Total: R1200</b>
              </dd>
              
            </div>
          </dl>
        </div>
      
      <div className='flex'>
        <Flex gap="large">
          <Button type='primary' danger onClick={() => dispatch(setCurrentStep(currentStep - 1))}>Back</Button>
          <Button type='primary' onClick={() => history.back()}>Edit Cart</Button>
          <Button danger className='justify-end'><PayFast /></Button>
        </Flex>
      </div>
    </div>
  )
}
