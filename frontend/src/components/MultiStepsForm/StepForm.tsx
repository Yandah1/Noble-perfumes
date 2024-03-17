"use client"

import { useSelector } from 'react-redux'
import React from 'react'
import DeliveryAddressForm from './StepForms/DeliveryAddressForm';
import PersonalInfoForm from './StepForms/PersonalInfoForm';
import Payment from './StepForms/Payment';
import PaymentSuccess from './StepForms/Success';

export default function StepForm() {
  const currentStep = useSelector((state: any) => state.stepForm?.currentStep);

  function renderFormByStep(step:number) {
    if (step === 0) {
      return <PersonalInfoForm />
    } else if (step === 1) {
      return <DeliveryAddressForm />
    } else if (step === 2) {
      return <Payment />
    } else if (step === 3) {
      return <PaymentSuccess />
    }
  }
  return (
    <>{renderFormByStep(currentStep)}</>
  )
}
