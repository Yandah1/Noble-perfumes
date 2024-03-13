import React from 'react'
import { generateSignature } from '@/utils/utilities';

export interface OrderInfo {
    name: string;
    email: string;
    order_no: string;
    payment_id: string;
    total: number;
  }

export default function PayFast({ order }: { order: OrderInfo }) {
    const cartTotal: number = order.total; // This amount needs to be sourced from your application
    const passPhrase: string = "nobleperfumes"
    const data: any = {
        // Merchant details
        'merchant_id': '10032903',
        'merchant_key': 'runrf7hq41f3s',
        'return_url': 'http://nobleperfumes.store',
        'cancel_url': 'http://nobleperfumes.store',
        'notify_url': 'http://34.204.81.17:3000/api/v1/payments/notify',
        // Buyer details
        'name_first': `${order.name}`,
        'email_address': `${order.email}`,
        // Transaction details
        'm_payment_id': `${order.payment_id}`, // Unique payment ID to pass through to notify_url
        'amount': Number((cartTotal).toFixed(2)),
        'item_name': `${order.order_no}`,
    };

    const signature: string = generateSignature(data, passPhrase);
    data['signature'] = signature;

    // If in testing mode make use of either sandbox.payfast.co.za or www.payfast.co.za
    const testingMode: boolean = true;
    const pfHost: string = testingMode ? 'sandbox.payfast.co.za' : 'www.payfast.co.za';

    let htmlForm: string = `<form action="https://${pfHost}/eng/process" method="post">`;
    for (const [name, value] of Object.entries(data)) {
        htmlForm += `<input name="${name}" type="hidden" value='${value}' />`;
    }
    htmlForm += '<input type="submit" value="Pay Now" /></form>';

    return (
        <div>
            {/* Render HTML content using dangerouslySetInnerHTML */}
            <div dangerouslySetInnerHTML={{ __html: htmlForm }} />
        </div>
    );
}
