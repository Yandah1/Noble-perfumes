import { notification } from 'antd';
import { client } from '../../sanity/lib/client';
import * as crypto from 'crypto';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

export async function handlePayment (setLoading: React.Dispatch<React.SetStateAction<boolean>>) {
    const cart = useSelector((state: RootState) => state.cart);
    const formData = useSelector((store: any) => store.stepForm?.formData);
    setLoading(true);

    try {
        // Make POST request to /order endpoint with the required data
        const response = await axios.post('/order', {
        orderItems: cart.items.map(item => ({
            quantity: item.quantity,
            product: item.perfume.name
        })),
        shippingAddress1: formData.shippingAddress1,
        shippingAddress2: formData.shippingAddress2,
        city: formData.city,
        zip: formData.zip,
        country: formData.country,
        phone: formData.phone,
        user: {
            fullname: formData.fullname,
            phone: formData.phone,
            email: formData.email
        }
        });
        
        // Handle non-success status code
        if (response.status !== 200) {
        throw new Error(`Failed to process payment: ${response.statusText}`);
        }

        // Calculate total price
        const total = cart.items.reduce((acc, item) => {
            const discountedPrice = item.perfume.price;
            return acc + item.quantity * discountedPrice;
        }, 0);

        const { transactionId } = response.data;
        return {transactionId, total};

    } catch (error) {
        console.error('Error while making payment:', error);
        notification.error({
        message: 'Payment Error',
        description: 'There was an error processing your payment. Please try again later.',
        });
        return null; // Return null if payment fails
    } finally {
        setLoading(false);
    }
};

export async function handleStatusUpdate(orderId: string, status: string): Promise<void> {
    try {
        await client
        .patch(`${orderId}`)
        .set({ status })
        .commit();
    } catch (error) {
        notification.error({
        message: 'Update Error:',
        description: 'There was an error updating your order status. No action from you required, the team has been alerted.',
        });
    }
}

interface PaymentData {
    [key: string]: any;
}

export function generateSignature(data: PaymentData, passPhrase: string | null = null): string {
    // Create parameter string
    let pfOutput = '';

    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            console.log(`${key} ${data[key]}`);
            const value = data[key];

            if (typeof value === 'string' && value !== '') {
                pfOutput += `${key}=${encodeURIComponent(value.trim()).replace(/%20/g, '+')}&`;
            } else if (typeof value === 'number') {
                pfOutput += `${key}=${value}&`;
            }
        }
    }

    // Remove last ampersand
    const getString = pfOutput.slice(0, -1);

    if (passPhrase !== null) {
        pfOutput += `passphrase=${encodeURIComponent(passPhrase.trim()).replace(/%20/g, '+')}`;
    }

    console.log(pfOutput);

    return crypto.createHash('md5').update(pfOutput).digest('hex');
};

export function assertValue<T>(v: T | undefined, errorMessage: string): T {
    if (v === undefined) {
      throw new Error(errorMessage)
    }
  
    return v
  }