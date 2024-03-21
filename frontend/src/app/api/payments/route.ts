// pages/api/payment.ts

import { generateSignature, generateOrderNumber, createOrder } from '@/utils/utilities';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const passPhrase: string = "nobleperfumes";
    try {
        const data = await req.json();

        // Generate signature
        //data.signature = generateSignature(data, passPhrase);
        data.item_name = generateOrderNumber()

        // Extract required values from request body
        const {
            merchant_id,
            merchant_key,
            return_url,
            cancel_url,
            notify_url,
            name_first,
            email_address,
            item_name,
            m_payment_id,
            amount,
            signature
        } = data;
        data.signature = generateSignature(data, passPhrase);

        const payFastPaymentURL = `https://sandbox.payfast.co.za/eng/process?merchant_id=${merchant_id}&merchant_key=${merchant_key}&return_url=${return_url}&cancel_url=${cancel_url}&notify_url=${notify_url}&m_payment_id=${encodeURIComponent(m_payment_id)}&amount=${amount}&item_name=${encodeURIComponent(item_name)}&name_first=${encodeURIComponent(name_first)}&email_address=${encodeURIComponent(email_address)}&signature=${signature}`;

        return new NextResponse(JSON.stringify({ payFastPaymentURL }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        return new NextResponse(JSON.stringify('An error occurred while processing payment.'), {
            status: 500,
        });
    }
};
