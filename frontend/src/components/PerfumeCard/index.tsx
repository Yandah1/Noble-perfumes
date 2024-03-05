"use client"

import React, { useState } from 'react';
import { Card, Button, Typography, Badge, InputNumber, Flex } from 'antd';
import { useDispatch } from 'react-redux';
import { addToCart, updateQuantity } from '@/redux/slices/cartSlice';
import { Perfume } from '../EcommercePage';

const { Meta } = Card;

const PerfumeCard: React.FC<{ perfume: Perfume }> = ({ perfume }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    dispatch(addToCart({ perfume, quantity }));
    
  };

  const handleUpdateQuantity = (value: number | null) => {
    if (value !== null) {
      setQuantity(value);
      dispatch(updateQuantity({ name: perfume.name, quantity: value }));
    }
  };

  const renderCardContent = () => (
    <>
      <div>
        <img
          alt={perfume.name}
          src={perfume.image}
          style={{ width: 200, height: 120, objectFit: 'cover' }}
        />
      </div>
      <div className='mt-2'>
        <Meta title={perfume.name} />
        <Card.Meta
          title={
            <Typography.Paragraph>
              Price: R{perfume.price}{" "}
              {perfume.discountPercentage > 0 && (
                <Typography.Text delete type="danger">
                  R{parseFloat(`${perfume.price + (perfume.price * (perfume.discountPercentage) / 100)}`).toFixed(2)}
                </Typography.Text>
              )}
            </Typography.Paragraph>
          }
        />
        <p className='mb-2'>{`Size: ${perfume.size} ml`}</p>
        <Flex gap="large">
          <InputNumber min={1} value={quantity} onChange={handleUpdateQuantity} />
          <Button type="primary" onClick={handleAddToCart}>Add to Cart</Button>          
        </Flex>
      </div>
    </>
  );

  return perfume.discountPercentage > 0 ? (
    <Badge.Ribbon className="itemCardBadge" text={`${perfume.discountPercentage}% Off`} color="pink">
      <Card hoverable style={{ width: 240 }}>
        {renderCardContent()}
      </Card>
    </Badge.Ribbon>
  ) : (
    <Card hoverable style={{ width: 240 }}>
      {renderCardContent()}
    </Card>
  );
};

export default PerfumeCard;