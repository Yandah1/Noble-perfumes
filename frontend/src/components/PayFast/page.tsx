"use client"
import React from 'react';
import { Button, notification } from 'antd';
import usePaymentHandler from '@/hooks/usePaymentHandler';
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
        </Button>
    );
};

export default PayFast;
