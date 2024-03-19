"use client"
import { Form, Input } from 'antd'
import React, { useState } from 'react'

export default function CheckOrdersPage() {
  const [results, setResults] = useState([{}])
  
  return (
    <div className='m-6 '>
      <Form
      style={{ maxWidth: 400 }}
      >
        <Form.Item
        name='search'
        label="Enter transaction id:"
        tooltip="e.g ghGFHB7HGFMv82j327hHhkHJ"
        >
          <Input.Search name='search' />
        </Form.Item>
      </Form>
      
      <div className='border-t border-gray-100'>
        {results.length > 0 && (
          <React.Fragment>
            <dl className="divide-y divide-gray-100">
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-pink-900">Personal Details:</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 col-span-1 sm:col-span-2 sm:mt-0">
                  <div>
                      <div>
                          <span className='text-nowrap'>
                            <p><b>Name: </b> Itumeleng Malgas</p>
                            <p><b>Email: </b> aaron.tumi@live.co.za</p>
                            <p><b>Phone: </b> 063 699 4946</p>
                          </span>
                          <dl>
                            <div className="md:grid grid-cols-6 sm:gap-1 sm:px-0">
                              <dt><p><b>Delivery Address:</b></p></dt>
                              <dd className="text-sm text-gray-700 md:col-span-2 sm:mt-0">
                                <div className='mt-1'>
                                    <div className='mb-2'>
                                        <p>2565 LEEPILE STREET</p>
                                        <p>BUILDING NO: 1252</p>
                                        <p>WARRENTON</p>
                                        <p>BLOEMFONTEIN</p>
                                        <p>1252</p>
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
                  <b className=''>Order status: SENT TO COURIER</b>
                </dd>
              </div>
            </dl>
          </React.Fragment>
        )}
      </div>
    </div>
  )
}
