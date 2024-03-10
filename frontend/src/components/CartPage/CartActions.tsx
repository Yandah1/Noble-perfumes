"use client"
import React from 'react';
import { Button, Flex } from 'antd';
import { useDispatch } from 'react-redux';
import { removeFromCart, increaseQuantity, decreaseQuantity } from '@/redux/slices/cartSlice';

interface CartActionsProps {
  perfumeId: string;
}

const CartActions: React.FC<CartActionsProps> = ({ perfumeId }) => {
  const dispatch = useDispatch();

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(perfumeId));
  };

  const handleIncreaseQuantity = () => {
    console.log('Increasing quantity:', perfumeId);
    dispatch(increaseQuantity(perfumeId));
  };

  const handleDecreaseQuantity = () => {
    dispatch(decreaseQuantity(perfumeId));
  };

  return (
    <Flex gap="small">
      <Button onClick={handleRemoveFromCart}>Remove</Button>
      <Button onClick={handleIncreaseQuantity}>+</Button>
      <Button onClick={handleDecreaseQuantity}>-</Button>
    </Flex>
  );
};

export default CartActions;