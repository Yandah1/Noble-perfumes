"use client"
import React, { useState } from 'react';
import { Button, notification } from 'antd';
import Image from 'next/image';
import { createOrder, generateOrderNumber, placeOrder, generateSignature } from '@/utils/utilities';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import axios from 'axios';

const PayFast: React.FC = () => {
    const formData = useSelector((store: any) => store.stepForm?.formData);
    const cart = useSelector((state: RootState) => state.cart);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handlePaymentButtonClick = async () => {
        let id = '';
        try {
            setIsLoading(true);
            const order = await placeOrder(cart, formData);
            id = order?.data._id;
            
            // Calculate total price
            const total = cart.items.reduce((acc: number, item: any) => {
                const discountedPrice = item.perfume.price;
                return acc + item.quantity * discountedPrice;
            }, 0);

            const orderInfo = {
                merchant_id: "10032903",
                merchant_key: "runrf7hq41f3s",
                return_url: `http://localhost:3000/success?transaction_id=${order?.data._id}`,
                cancel_url: "http://nobleperfumes.store",
                notify_url: "http://34.204.81.17:3000/api/v1/payments/notify",
                name_first: formData.fullname,
                email_address: formData.email,
                item_name: generateOrderNumber(),
                m_payment_id: order?.data._id,
                amount: total,
                signature: ''
            };

            const response = await axios.post('/api/payments', orderInfo);
            if(response.status == 200){
                await createOrder(order?.data._id ?? '', order?.data.status)
                window.open(response.data.payFastPaymentURL)
            }

        } catch (error) {
            console.error('Error while processing payment:', error);
            
            await axios.get(`http://backend.nobleperfumes.store:3000/api/v1/orders/${id}`)
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