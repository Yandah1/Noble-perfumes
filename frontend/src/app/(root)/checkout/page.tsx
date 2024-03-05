import StepForm from '@/components/MultiStepsForm/StepForm'
import StepsComponent from '@/components/MultiStepsForm/Steps'
import React from 'react'

export default function Checkout() {
  return (
    <div className='pr-3'>
      <StepsComponent />
      <div className='mt-5'>
        <StepForm />
      </div>
    </div>
    
  )
}
