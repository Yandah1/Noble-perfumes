"use client";

import { setCurrentStep, updateFormData } from '@/redux/slices/stepFormSlice';
import { Button, Checkbox, Form, Input } from 'antd';
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

export default function PersonalInfoForm() {
  const currentStep = useSelector((store: any) => store.stepForm?.currentStep);
  const formData = useSelector((store: any) => store.stepForm?.formData);

  const dispatch = useDispatch();
  async function processData(data: any) {
    dispatch(updateFormData(data));

    dispatch(setCurrentStep(currentStep + 1));
    console.log(formData);
  }

  const [form] = Form.useForm();

  return (
    <Form
    {...formItemLayout}
    form={form}
    name="personaldata"
    onFinish={processData}
    initialValues={formData}
    style={{ minWidth: 600 }}
    scrollToFirstError
  >
    <Form.Item
      name="fullname"
      label="Full Name"
      tooltip="Enter your Name and Surname"
      rules={[{ required: true, message: 'Please input your full names!', whitespace: true }]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      name="phone"
      label="Phone Number"
      rules={[{ required: true, message: 'Please input your phone number!' }]}
    >
      <Input addonBefore="+27" style={{ width: '100%' }} />
    </Form.Item>

    <Form.Item
      name="email"
      label="E-mail"
      rules={[
        {
          type: 'email',
          message: 'The input is not valid E-mail!',
        },
        {
          required: true,
          message: 'Please input your E-mail!',
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      name="agreement"
      valuePropName="checked"
      rules={[
        {
          validator: (_, value) =>
            value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
        },
      ]}
      {...tailFormItemLayout}
    >
      <Checkbox>
        I have read the <a href="">agreement</a>
      </Checkbox>
    </Form.Item>
    <Form.Item {...tailFormItemLayout}>
      <Button type="primary" htmlType="submit">
        Continue
      </Button>
    </Form.Item>
  </Form>
  )
}
