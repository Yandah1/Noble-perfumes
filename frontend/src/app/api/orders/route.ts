// pages/api/v1/orders.ts

import axios from "axios";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    try {
        // Extract data from the request body
        // const { orderItems, shippingAddress1, shippingAddress2, city, zip, country, phone, user } = await req.json();
        const data = await req.json();

        const transactionId = "14653618653";
        const status = "Pending"

        // Set transactionId in the request body
        const requestBody = {
            ...data,
            //transactionId,
            status
        };
        console.log(requestBody)
        const response = await axios.post('http://backend.nobleperfumes.store/api/v1/orders', {requestBody});
        
        // Handle response from the backend API
        return new NextResponse(JSON.stringify(requestBody), {
            status: 200,
        });
    } catch (error) {
        return new NextResponse("Somthing bad", {
            status: 500,
          });
    }
};
