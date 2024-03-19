import { notification } from 'antd';
import { client } from '../../sanity/lib/client';
import * as crypto from 'crypto';
import axios from 'axios';
import { format } from 'date-fns';
import { groq } from 'next-sanity';

export async function handlePayment(setLoading: React.Dispatch<React.SetStateAction<boolean>>, cart: any, formData: any) {
    setLoading(true);

    try {
        // Make POST request to /order endpoint with the required data
        const response = await axios.post('/api/orders', {
            orderItems: cart.items.map((item:any) => ({
                quantity: item.quantity,
                product: item.perfume.name
            })),
            shippingAddress1: formData.street_address,
            shippingAddress2: formData.building,
            city: formData.city,
            zip: formData.postal_code,
            country: "South Africa",
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
        const total = cart.items.reduce((acc: number, item: any) => {
            const discountedPrice = item.perfume.price;
            return acc + item.quantity * discountedPrice;
        }, 0);

        const { transactionId } = response.data;
        return { transactionId, total };

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
        const data = await client.fetch(
            groq`
                *[_type == "order"] {
                _id,
                }
            `
            );

            console.log(data[0]._id)
        await client
            .patch(data[0]._id)
            .set({ status: 'Processing' })
            .commit();
    } catch (error) {
        notification.error({
            message: `Update Error: ${error}`,
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

export const generateOrderNumber = (): string => {
    const timestamp = format(new Date(), 'yyyyMMddHHmmss');
    const orderNumber = `ORD#${timestamp}`;
    return orderNumber;
  };

export function assertValue<T>(v: T | undefined, errorMessage: string): T {
    if (v === undefined) {
      throw new Error(errorMessage)
    }
  
    return v
  }