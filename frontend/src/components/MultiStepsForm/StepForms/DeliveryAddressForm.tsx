"use client"

import { setCurrentStep, updateFormData } from '@/redux/slices/stepFormSlice';
import { Button, Flex, Form, Input } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

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
    form={form}
    initialValues={formData}
    onFinish={processData}>
    <Form.Item label="line1" name="line1">
      <Input />
    </Form.Item>
    <Form.Item label="line2" name="line2">
      <Input />
    </Form.Item>
    <Form.Item label="line3" name="line3">
      <Input />
    </Form.Item>
    <Flex gap="small">
      <Button type='primary' danger onClick={() => dispatch(setCurrentStep(currentStep - 1))}>Back</Button>
      <Button type='primary' htmlType="submit">Continue</Button>
    </Flex>
  </Form>
  )
}
