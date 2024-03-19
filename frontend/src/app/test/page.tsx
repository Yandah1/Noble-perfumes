"use client"
import { handleStatusUpdate } from '@/utils/utilities'
import { Button } from 'antd'
import React from 'react'

export default function Test() {
  const handleOnClick = async ()  => {
    await handleStatusUpdate("order_id", "Processing")
  }
  return (
    <div>
        <Button onClick={handleOnClick} >Click</Button>
    </div>
  )
}
