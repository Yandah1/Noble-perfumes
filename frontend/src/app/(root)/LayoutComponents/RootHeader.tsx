"use client"
import React from 'react';
import { Button, Flex } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import Link from 'next/link';
import SearchInput from '@/components/SearchInput/page';
import { useDispatch, useSelector, } from 'react-redux';
import { setSearch, setCategory } from '@/redux/slices/searchSlice';
import { RootState } from '@/redux/store';

const RootHeader: React.FC = () => {
  const cart = useSelector((state: RootState) => state.cart);
  console.log(cart.items)
  const dispatch = useDispatch();

  return (
    <div className='flex justify-between items-center h-3xl py-5'>
      <Link href='/'>
        <div className='flex items-center text-black-400 text-nowrap'>
          <h1 className='text-5xl font-extrabold '>ALX |</h1>
          <h3 className='text-3xl font-extralight text-pink-600 pl-2'>Noble Perfumes</h3>
        </div>
      </Link>
      <div className='text-white-500 hidden lg:flex'>
      <SearchInput
        onSearch={(value) => dispatch(setSearch(value))}
        onCategoryChange={(value) => dispatch(setCategory(value))}
      />
        <Flex gap='small'>
          <Button type='default'>
            <span className='text-pink-500'>CHECK YOUR ORDER</span>
          </Button>
          <Link href='/cart'>
            <Button type='primary' icon={<ShoppingCartOutlined />} />
          </Link>
        </Flex>
      </div>
    </div>
  );
};

export default RootHeader;
