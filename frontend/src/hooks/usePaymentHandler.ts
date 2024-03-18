import { useState } from 'react';
import { generateSignature, handlePayment } from '@/utils/utilities';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';

export interface OrderInfo {
    // Merchant details
    merchant_id: string;
    merchant_key: string;
    return_url: string;
    cancel_url: string;
    notify_url: string;
    // Buyer details
    name_first: string;
    email_address: string;
    // Transaction details
    m_payment_id: string;
    amount: number;
    item_name: string;
    signature: string;
}


const generateOrderNumber = (): string => {
  const timestamp = format(new Date(), 'yyyyMMddHHmmss');
  const orderNumber = `ORD#${timestamp}`;
  return orderNumber;
};

const usePaymentHandler = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [orderInfo, setOrderInfo] = useState<OrderInfo>();

  const handlePaymentProcess = async () => {
    const passPhrase: string = "nobleperfumes";
    setIsLoading(true);

    try {
      const formData = useSelector((store: any) => store.stepForm?.formData);

      // Call handlePayment function to initiate the payment process
      const pay  = await handlePayment(setIsLoading);
      

      const order_info: OrderInfo = {
          merchant_id: "10032903",
          merchant_key: "runrf7hq41f3s",
          return_url: `http://nobleperfumes.store?transaction_id=${pay?.transactionId}`,
          cancel_url: `http://nobleperfumes.store?transaction_id=${pay?.transactionId}`,
          notify_url: "http://34.204.81.17:3000/api/v1/payments/notify",

          name_first: formData.fullname,
          email_address: formData.email,

          item_name: generateOrderNumber(), // Dynamically generate order number
          m_payment_id: pay?.transactionId,
          amount: pay?.total ?? 0,
          signature: ''
      };

      const signature: string = generateSignature(order_info, passPhrase);
      order_info['signature'] = signature;

      // Set the order object in the state
      setOrderInfo(order_info);
    } catch (error) {
      console.error('Error while making payment:', error);
      // Handle error
    } finally {
      setIsLoading(false);
    }
  };

  return { handlePaymentProcess, isLoading, orderInfo };
};

export default usePaymentHandler;