"use client"
import React, { useEffect } from 'react';
import { CheckCircleOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useRouter } from 'next/navigation';

const PaymentSuccess = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to home page after 5 seconds
    const timeout = setTimeout(() => {
      router.push('/ecommerce');
    }, 5000);

    // Clear timeout when component unmounts to prevent memory leaks
    return () => clearTimeout(timeout);
  }, []);

  const handleReturnHome = () => {
    router.push('/ecommerce');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-green-500 text-5xl mb-4">
        <CheckCircleOutlined />
      </div>
      <h1 className="text-3xl font-semibold mb-4">Payment Successful!</h1>
      <p className="text-lg text-gray-600 mb-8">Thank you for your purchase.</p>
      <Button type="primary" onClick={handleReturnHome}>Return to Home</Button>
    </div>
  );
};

export default PaymentSuccess;
