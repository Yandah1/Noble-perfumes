"use client"

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
      <Button type='primary' danger onClick={() => dispatch(setCurrentStep(currentStep - 1))}>Back</Button>
    </div>
  )
}
