import React from 'react'
import { assertValue, generateSignature } from '@/utils/utilities';

export default function PayFast() {
    const cartTotal: number = 1000.00; // This amount needs to be sourced from your application
    const passPhrase: string = "nobleperfumes"
    const data: any = {
        // Merchant details
        'merchant_id': '10032903',
        'merchant_key': 'runrf7hq41f3s',
        'return_url': 'http://www.nobleperfumes.store/return',
        'cancel_url': 'http://www.nobleperfumes.store/cancel',
        'notify_url': 'http://www.nobleperfumes.store/notify',
        // Buyer details
        'name_first': 'Noble',
        'name_last': 'Malgas',
        'email_address': 'noblegaz@gmail.com',
        // Transaction details
        'm_payment_id': '123456', // Unique payment ID to pass through to notify_url
        'amount': Number((cartTotal).toFixed(2)),
        'item_name': 'Order#12345',
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
