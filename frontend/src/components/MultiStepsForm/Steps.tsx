"use client"
import React from 'react';
import { Steps } from 'antd';
import { CarOutlined, CheckCircleOutlined, UserOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';

export default function StepsComponent() {
  const currentStep = useSelector((store: any) => store.stepForm?.currentStep);

  return (
    <div>
      <Steps current={currentStep}>
        <Steps.Step title="Contact info" icon={<UserOutlined />} />
        <Steps.Step title="Delivery Address" icon={<CarOutlined />} />
        <Steps.Step title="Payment" icon={<CheckCircleOutlined />} />
      </Steps>
    </div>
  );
}
