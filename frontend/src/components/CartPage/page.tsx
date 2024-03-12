"use client"
import React from 'react';
import { Table, Button, Flex } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import Link from 'next/link';
import CartActions from './CartActions';

const CartPage: React.FC = () => {
  const cart = useSelector((state: RootState) => state.cart);

  const columns = [
    {
      title: 'Product',
      dataIndex: ['perfume', 'name'],
      key: 'name',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Price',
      dataIndex: 'perfume.price',
      key: 'price',
      render: (text: any, record: any) => `R${record.perfume.price.toFixed(2)}`,
    },
    {
      title: 'Subtotal',
      dataIndex: 'subtotal',
      key: 'subtotal',
      render: (text: any, record: any) => `R${(record.quantity * record.perfume.price).toFixed(2)}`,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text: any, record: any) => (
        <CartActions perfumeId={record.perfume._id} />
      ),
    },
  ];  

  const total = cart.items.reduce((acc, item) => {
    const discountedPrice = item.perfume.price;
    return acc + item.quantity * discountedPrice;
  }, 0);

  return (
    <div className='lg:px-5'>
      <h3 className='text-bold mb-3'>Your Cart</h3>
      {cart.items.length > 0 ? (
        <div>
          <Table   dataSource={cart.items.map(item => ({ ...item, key: item.perfume._id }))}
            columns={columns} />
          <div>
            <h3>Total: R{total.toFixed(2)}</h3>
              <Flex gap="small">
                <Link href='/checkout'><Button type="primary" danger >Checkout</Button></Link>
                <Link href={"/"}><Button type='primary'>Continue Shopping</Button></Link>
              </Flex>
          </div>
        </div>
      ) : (
        <><p className='mb-5 text-red-400'>Your cart is empty!!</p><Link href={"/"}><Button type='primary'>Continue Shopping</Button></Link></>
      )}
    </div>
  );
};

export default CartPage;