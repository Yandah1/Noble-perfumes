"use client"

import PayFast from '@/components/PayFast/page';
import { setCurrentStep } from '@/redux/slices/stepFormSlice'
import { Button, Flex, notification } from 'antd'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import { RootState } from '@/redux/store';
import usePaymentHandler from '@/hooks/usePaymentHandler';

export default function Payment() {
  const currentStep = useSelector((store: any) => store.stepForm?.currentStep);
  const { orderInfo } = usePaymentHandler();
  const cart = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  // Calculate total price
  const total = cart.items.reduce((acc, item) => {
    const discountedPrice = item.perfume.price;
    return acc + item.quantity * discountedPrice;
  }, 0);

  return (
    <div className='max-w-96'>
        <div className="px-4 sm:px-0">
          <h3 className="text-base font-semibold leading-7 text-gray-500">Order Overview</h3>
        </div>
        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-pink-900">Ordered Items:</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                <div className='mb-2'>
                  {cart.items.map((item, index) => (
                    <div className='mb-2'>
                        <p>{index + 1}. {item.perfume.name}</p>
                        <span>{item.perfume.size}ml x{item.quantity}</span>
                        <hr />
                    </div>
                  ))}
                </div>
                <b className=''>Total: R{total.toFixed(2)}</b>
              </dd>
              
            </div>
          </dl>
        </div>
      
      <div className='flex'>
        <Flex gap="small">
          <Button danger onClick={() => dispatch(setCurrentStep(currentStep - 1))}>Back</Button>
          <Button type='primary' onClick={() => history.back()}>Edit Cart</Button>
            <PayFast />
            <p className='max-w-2xl text-sm text-gray-600'>
              <Image className='leading-10' alt='pay_fast_banner' width={100} height={10} src="/images/PayFast_Logo_OnLightBackground_2.png" />
            </p>
        </Flex>
      </div>
    </div>
  )
}
