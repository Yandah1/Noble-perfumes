"use client"
import React from 'react';
import { Badge, Breadcrumb, Button, Flex } from 'antd';
import { AlignRightOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import Link from 'next/link';
import SearchInput from '@/components/SearchInput/page';
import { useDispatch, useSelector, } from 'react-redux';
import { setSearch, setCategory } from '@/redux/slices/searchSlice';
import { RootState } from '@/redux/store';
import { usePathname } from 'next/navigation'
import DrawerComponent from '@/components/Drawer/page';


const RootHeader: React.FC = () => {
  const cart = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const pathname = usePathname()

  return (
    <div className='flex justify-between items-center h-3xl py-5'>
      <Link href='/'>
        <div className='flex items-center text-black-400 text-nowrap'>
          <h1 className='text-5xl font-extrabold '>ALX |</h1>
          <h3 className='text-3xl font-extralight text-pink-600 pl-2'>Noble Perfumes</h3>
        </div>
      </Link>
      <div className='text-white-500 hidden lg:flex'>
        {pathname === '/' && (
          <SearchInput
            onSearch={(value) => dispatch(setSearch(value))}
            onCategoryChange={(value) => dispatch(setCategory(value))}
          />
        )}
        <Flex gap='small'>
          <Button type='default'>
            <Link href={"/orders"}>
            <span className='text-pink-500'>CHECK YOUR ORDER</span>
            </Link>
          </Button>
          <Badge count={cart.items.length} showZero>
            <Link href={"cart"}><Button type='primary' icon={<ShoppingCartOutlined />} /></Link>
          </Badge>
        </Flex>
      </div>
      <div className='lg:hidden'>
        <DrawerComponent />
      </div>
    </div>
  );
};

export default RootHeader;
