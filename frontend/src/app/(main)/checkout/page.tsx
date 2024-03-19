"use client"
import StepForm from '@/components/MultiStepsForm/StepForm'
import StepsComponent from '@/components/MultiStepsForm/Steps'
import React from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentStep } from '@/redux/slices/stepFormSlice';

export default function Checkout() {
  const currentStep = useSelector((store: any) => store.stepForm?.currentStep);
  const dispatch = useDispatch();
 
  const searchParames = useSearchParams();

  if (searchParames.get('transaction_id')) {
    dispatch(setCurrentStep(currentStep + 1));
  }

  return (
    <div className='pr-3'>
      <StepsComponent />
      <div className='flex flex-col items-center mt-9'>
        <StepForm />
      </div>
    </div>
    
  )
}
