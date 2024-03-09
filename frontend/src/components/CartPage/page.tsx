"use client"
import React, { useState } from 'react';
import { Table, Button, Flex } from 'antd';
import { addToCart } from '@/redux/slices/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

// Assume Perfume type is defined somewhere in your code
type Perfume = {
  _id: string,
  slug: string,
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  alt: string,
  size: string;
  category: string;
  discountPercentage: number;
};

const CartPage: React.FC = () => {
  const cart = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  
  // Dispatching addToCart action
  const handleAddToCart = (perfume: Perfume, quantity: number) => {
    dispatch(addToCart({ perfume, quantity }));
  };

  const [cartItems, setCartItems] = useState<{ perfume: Perfume; quantity: number }[]>([]);

  const removeFromCart = (perfumeId: string) => {
    const updatedCartItems = cartItems.filter(item => item.perfume.id !== perfumeId);
    setCartItems(updatedCartItems);
  };

  const increaseQuantity = (perfumeId: string) => {
    const updatedCartItems = cartItems.map(item => {
      if (item.perfume.id === perfumeId) {
        item.quantity += 1;
      }
      return item;
    });
    setCartItems(updatedCartItems);
  };

  const decreaseQuantity = (perfumeId: string) => {
    const updatedCartItems = cartItems.map(item => {
      if (item.perfume.id === perfumeId && item.quantity > 1) {
        item.quantity -= 1;
      }
      return item;
    });
    setCartItems(updatedCartItems);
  };

  const columns = [
    {
      title: 'Product',
      dataIndex: 'perfume.name',
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
      title: 'Discount',
      dataIndex: 'perfume.discountPercentage',
      key: 'discountPercentage',
      render: (text: any, record: any) => `${record.perfume.discountPercentage}%`,
    },
    {
      title: 'Subtotal',
      dataIndex: 'subtotal',
      key: 'subtotal',
      render: (text: any, record: any) => `R${(record.quantity * record.perfume.price * (1 - record.perfume.discountPercentage / 100)).toFixed(2)}`,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text: any, record: any) => (
        <Flex gap={"small"}>
          <Button onClick={() => removeFromCart(record.perfume.id)}>Remove</Button>
          <Button onClick={() => increaseQuantity(record.perfume.id)}>+</Button>
          <Button onClick={() => decreaseQuantity(record.perfume.id)}>-</Button>
        </Flex>
      ),
    },
  ];
  

  const total = cartItems.reduce((acc, item) => acc + item.quantity * item.perfume.price * (1 - item.perfume.discountPercentage / 100), 0);

  return (
    <div className='px-5'>
      <h3 className='text-bold mb-3'>Your Cart</h3>
      {cartItems.length > 0 ? (
        <div>
          <Table  dataSource={cartItems} columns={columns} />
          <div>
            <h3>Total: ${total.toFixed(2)}</h3>
              <Flex gap="small">
                <Button type="primary" danger href='/checkout'>Checkout</Button>
                <Button type='primary' onClick={() => history.back()}>Continue Shopping</Button>
              </Flex>
          </div>
        </div>
      ) : (
        <p>Your cart is empty</p>
      )}
    </div>
  );
};

export default CartPage;