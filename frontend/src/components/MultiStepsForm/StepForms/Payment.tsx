"use client"

import PayFast from '@/components/PayFast/page';
import { setCurrentStep } from '@/redux/slices/stepFormSlice'
import { Button } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

export default function Payment() {
  const currentStep = useSelector((store: any) => store.stepForm?.currentStep);
  const formData = useSelector((store: any) => store.stepForm?.formData);
  const dispatch = useDispatch();
  
  console.log(formData)
  return (
    <div>
      <div>Order overview</div>
      <div className='flex'>
        
        <Button type='primary' danger onClick={() => dispatch(setCurrentStep(currentStep - 1))}>Back</Button>
        <span className='m-1'><PayFast /></span>
      </div>
    </div>
  )
}
