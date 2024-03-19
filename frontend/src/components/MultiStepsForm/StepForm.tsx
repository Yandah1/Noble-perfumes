"use client"

import { useSelector } from 'react-redux'
import React from 'react'
import DeliveryAddressForm from './StepForms/DeliveryAddressForm';
import PersonalInfoForm from './StepForms/PersonalInfoForm';
import Payment from './StepForms/Payment';

export default function StepForm() {
  const currentStep = useSelector((state: any) => state.stepForm?.currentStep);

  function renderFormByStep(step:number) {
    if (step === 0) {
      return <PersonalInfoForm />
    } else if (step === 1) {
      return <DeliveryAddressForm />
    } else if (step === 2) {
      return <Payment />
    }
  }
  return (
    <>{renderFormByStep(currentStep)}</>
  )
}
