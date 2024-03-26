"use client"
import { getOrderStatus } from '@/utils/utilities'
import { Form, Input } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

interface Result {
  phone: string
  dateOrdered: string
  user: {
    name: string,
    email: string,
    phone: string,
  }
  shippingAddress1: string;
  shippingAddress2: string;
  city: string;
  state: string;
  zip: string;
}

export default function CheckOrdersPage() {
  const [results, setResults] = useState<Result>()
  const [order, setOrder] = useState<any>()
  const [orderId, setOrderId] = useState<string>()

  console.log(results)

  useEffect(() => {
    // Function to fetch data from the API
    const fetchData = async () => {
      try {
        if (orderId) {
          const response = await axios.get(`https://nobleperfumes.store/api/v1/orders/${orderId}`);
          let ord = await getOrderStatus(orderId)
          setOrder(ord)
          setResults(response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    // Cleanup function
    return () => {
      // Any cleanup code can go here if needed
    };
  }, [orderId]); 

  return (
    <div className='m-6 '>
      <Form
        style={{ maxWidth: 400 }}
      >
        <Form.Item
          name='order_id'
          label="Enter Order id:"
          tooltip="e.g ghGFHB7HGFMv82j327hHhkHJ"
        >
          <Input.Search
            onChange={(e) => setOrderId(e.target.value)}
            enterButton
            name='order_id' />
        </Form.Item>
      </Form>
      
      <div className='border-t border-gray-100'>
        {results && (
          <React.Fragment>
            <dl className="divide-y divide-gray-100">
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-pink-900">Personal Details:</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 col-span-1 sm:col-span-2 sm:mt-0">
                  <div>
                      <div>
                          <span className='text-nowrap'>
                            <p><b>Name: </b>{results.user.name}</p>
                            <p><b>Date Ordered: </b>{results.dateOrdered}</p>
                            <p><b>Phone: </b>{results?.phone}</p>
                            
                          </span>
                          <dl>
                            <div className="md:grid grid-cols-6 sm:gap-1 sm:px-0">
                              <dt><p><b>Delivery Address:</b></p></dt>
                              <dd className="text-sm text-gray-700 md:col-span-2 sm:mt-0">
                                <div className='mt-1'>
                                    <div className='mb-2'>
                                      <p>{results.shippingAddress1}</p>
                                      <p>{results.shippingAddress2}</p>
                                      <p>{results.city}</p>
                                      <p>{results.state}</p>
                                      <p>{results.zip}</p>
                                    </div>
                                </div>
                              </dd>
                            </div>
                          </dl>
                          <hr />
                      </div>
                  </div>
                </dd>
              </div>
            </dl>
            <dl className="divide-y divide-gray-100">
              <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-pink-900">Ordered Items:</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <div className='mb-2'>
                      <div className='mb-2'>
                          <p>1. The name 100ml - x3</p>
                      </div>
                      <hr />
                  </div>
                  {order && (
                    <b className=''>Order status: {order.status}</b>
                  )}
                </dd>
              </div>
            </dl>
          </React.Fragment>
        )}
      </div>
    </div>
  )
}
