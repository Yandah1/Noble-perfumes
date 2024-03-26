import { notification } from 'antd';
import { client } from '../../sanity/lib/client';
import * as crypto from 'crypto';
import axios from 'axios';
import { format } from 'date-fns';
import { groq } from 'next-sanity';

export async function placeOrder(cart: any, formData: any) {
    
    const data = {
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
            name: formData.fullname,
            phone: formData.phone,
            email: formData.email
        },
        transactionId: "",
        status: "Awaiting Payment"
    }

    try {
        // Make POST request to /order endpoint with the required data
        return await axios.post('http://nobleperfumes.store/api/v1/orders', data);
    } catch (error) {
        notification.error({
            message: 'Order Placement Error',
            description: 'There was an error processing your payment. Please try again later.' + error,
        });
    }
};


export async function handleStatusUpdate(orderId: string, status: string): Promise<void> {
    try {
        const data = await client.fetch(
            groq`
                *[_type == "order" && order_id == $orderId] {
                    _id,
                    order_id,
                    status
                }[0]  // Limiting to the first result (if any)
            `,
            { orderId } // Parameterized query
        );
        console.log(data)
        await client
            .patch(data._id)
            .set({ status: `${status}` })
            .commit();
    } catch (error) {
        notification.error({
            message: `Update Error: ${error}`,
            description: 'There was an error updating your order status. No action from you required, the team has been alerted.',
        });
    }
}

export async function getOrderStatus(orderId: string): Promise<any> {
    try {
        const data = await client.fetch(
            groq`
                *[_type == "order" && order_id == $orderId] {
                    _id,
                    order_id,
                    status
                }[0]  // Limiting to the first result (if any)
            `,
            { orderId } // Parameterized query
        );
        return (data);
    } catch (error) {
        notification.error({
            message: `Order get Error: ${error}`,
            description: 'There was an error getting your order status. No action from you required, the team has been alerted.',
        });
    }
}

// Function to create a new order document
export async function createOrder(orderId: string, status: string) {
    try {
        // Create operation
        await client
            .create({
                _type: 'order', 
                order_id: orderId,
                status: status
            })
            .then(res => console.log('Order created successfully:', res))
            .catch(err => console.error('Error creating order:', err));
    } catch (error) {
        console.error('Error creating order.');
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

    return crypto.createHash('md5').update(pfOutput).digest('hex');
};

export const generateOrderNumber = (): string => {
    const timestamp = format(new Date(), 'yyyyMMddHHmmss');
    const orderNumber = timestamp;
    return orderNumber;
};

export function assertValue<T>(v: T | undefined, errorMessage: string): T {
    if (v === undefined) {
      throw new Error(errorMessage)
    }
  
    return v
  }
