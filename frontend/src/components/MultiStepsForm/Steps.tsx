"use client"
import React from 'react';
import { Steps } from 'antd';
import { BankOutlined, CarOutlined, CheckCircleOutlined, UserOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';

export default function StepsComponent() {
  const currentStep = useSelector((store: any) => store.stepForm?.currentStep);

  return (
    <div>
      <Steps type='navigation' current={currentStep}>
        <Steps.Step title={<span className="font-bold text-gray-400">Contact info</span>} icon={<UserOutlined />} />
        <Steps.Step title={<span className="font-bold text-gray-400">Delivery Address</span>} icon={<CarOutlined />} />
        <Steps.Step title={<span className="font-bold text-gray-400">Payment</span>} icon={<BankOutlined />} />
      </Steps>
    </div>
  );
}
