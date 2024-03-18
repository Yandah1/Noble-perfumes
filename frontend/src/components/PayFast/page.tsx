"use client"
import React from 'react';
import { Button, notification } from 'antd';
import usePaymentHandler from '@/hooks/usePaymentHandler';
import Image from 'next/image';
import axios from 'axios';

const PayFast: React.FC = () => {
    const { handlePaymentProcess, isLoading, orderInfo } = usePaymentHandler();
    const pfHost: string = true ? 'sandbox.payfast.co.za' : 'www.payfast.co.za';

    const handlePaymentButtonClick = async () => {
        try {
            await handlePaymentProcess();
            await axios.post(pfHost, orderInfo);

            notification.success({
                message: 'Payment Successful',
                description: 'Your payment was processed successfully.',
            });
        } catch (error) {
            console.error('Error while processing payment:', error);
            notification.error({
                message: 'Payment Error',
                description: 'There was an error processing your payment. Please try again later.',
            });
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
