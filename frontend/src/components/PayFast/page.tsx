"use client"
import React, { useState } from 'react';
import { Button, notification } from 'antd';
import Image from 'next/image';
import axios from 'axios';
import { generateOrderNumber, handlePayment } from '@/utils/utilities';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { setCurrentStep } from '@/redux/slices/stepFormSlice';

const PayFast: React.FC = () => {
    const currentStep = useSelector((store: any) => store.stepForm?.currentStep);
    const formData = useSelector((store: any) => store.stepForm?.formData);
    const cart = useSelector((state: RootState) => state.cart);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const dispatch = useDispatch();

    const handlePaymentButtonClick = async () => {
        try {
            setIsLoading(true);

            // Call handlePayment function to initiate the payment process
            const pay = await handlePayment(setIsLoading, cart, formData);
            JSON.parse(pay?.transactionId)

            const orderInfo = {
                merchant_id: "10032903",
                merchant_key: "runrf7hq41f3s",
                return_url: `http://localhost:3000/success?transaction_id=${pay?.transactionId}`,
                cancel_url: `http://nobleperfumes.store?transaction_id=${pay?.transactionId}`,
                notify_url: "http://34.204.81.17:3000/api/v1/payments/notify",
                name_first: formData.fullname,
                email_address: formData.email,
                item_name: generateOrderNumber(), // Dynamically generate order number
                m_payment_id: pay?.transactionId,
                amount: pay?.total ?? 0,
                signature: ''
            };

            // Make a POST request to your payment API endpoint
            const response = await axios.post('/api/payments', orderInfo);
            if(response.status == 200){
                window.open(response.data.payFastPaymentURL)
            }

        } catch (error) {
            console.error('Error while processing payment:', error);
            // Payment failed, show error notification
            notification.error({
                message: 'Payment Error',
                description: 'There was an error processing your payment. Please try again later.',
            });
        } finally {
            setIsLoading(false);
            
        }
    };

    return (
        <Button loading={isLoading} onClick={handlePaymentButtonClick}>
            Pay Now
            <p className='max-w-2xl text-sm text-gray-600'>
              <Image className='leading-10' alt='pay_fast_banner' width={100} height={10} src="/images/PayFast_Logo_OnLightBackground_2.png" />
            </p>
        </Button>
    );
};

export default PayFast;