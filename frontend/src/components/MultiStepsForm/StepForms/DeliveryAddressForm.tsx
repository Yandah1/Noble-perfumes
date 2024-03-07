"use client"

import { setCurrentStep, updateFormData } from '@/redux/slices/stepFormSlice';
import { Button, Flex, Form, Input, Select } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const provincesObject = {
  provinces: [
    { value: 'Eastern Cape', label: 'Eastern Cape' },
    { value: 'Free State', label: 'Free State' },
    { value: 'Gauteng', label: 'Gauteng' },
    { value: 'KwaZulu-Natal', label: 'KwaZulu-Natal' },
    { value: 'Limpopo', label: 'Limpopo' },
    { value: 'Mpumalanga', label: 'Mpumalanga' },
    { value: 'Northern Cape', label: 'Northern Cape' },
    { value: 'North West', label: 'North West' },
    { value: 'Western Cape', label: 'Western Cape' }
  ]
};

export default function DeliveryAddressForm() {
  const currentStep = useSelector((store: any) => store.stepForm?.currentStep);
  const formData = useSelector((store: any) => store.stepForm?.formData);

  const dispatch = useDispatch();
  async function processData(data: any) {
    dispatch(updateFormData(data));

    dispatch(setCurrentStep(currentStep + 1));
    console.log(data);
  }

  const [form] = Form.useForm();
  return (
  <Form
    {...formItemLayout}
    style={{ maxWidth: 600 }}
    form={form}
    initialValues={formData}
    onFinish={processData}>
    <Form.Item label="Street Address" name="street_address">
      <Input />
    </Form.Item>
    <Form.Item label="Complex / Building" name="building">
      <Input />
    </Form.Item>
    <Form.Item label="Suburb" name="suburb">
      <Input />
    </Form.Item>
    <Form.Item label="City / Town" name="city">
      <Input />
    </Form.Item>
    <Form.Item label="Postal Code" name="postal_code">
      <Input style={{width: 100}} />
    </Form.Item>

    <Form.Item label="Province">
      <Select
        defaultValue="Free State"
        style={{ width: 150 }}
        //onChange={handleChange}
        options= {provincesObject.provinces}
      />
    </Form.Item>


    <Form.Item {...tailFormItemLayout}>
      <Flex  gap="small">
        <Button type='primary' danger onClick={() => dispatch(setCurrentStep(currentStep - 1))}>Back</Button>
        <Button type='primary' htmlType="submit">Continue</Button>
      </Flex>
    </Form.Item>
  </Form>
  )
}
