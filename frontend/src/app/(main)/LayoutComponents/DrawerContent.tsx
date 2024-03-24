import SearchInput from '../../../components/SearchInput/page'
import { setCategory, setSearch } from '@/redux/slices/searchSlice'
import { RootState } from '@/redux/store';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { Badge, Button, Flex } from 'antd';
import Link from 'next/link';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

export default function SiderContent() {
  const cart = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  return (
    <div className='mx-5'>
      <SearchInput
        onSearch={(value) => dispatch(setSearch(value))}
        onCategoryChange={(value) => dispatch(setCategory(value))}
      />
      <div className='mt-10 flex flex-col items-cente'>
        <div className='p-5'>
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
        <hr />
        <div className='gap-5 h-48 flex flex-col justify-center items-center'>
          <Button><Link href="about">About Us</Link></Button>
          <Button><Link href="terms">Terms of Service</Link></Button>
          <Button><Link href="privacy">Privacy Policy</Link></Button>
        </div>
      </div>
    </div>
  )
}
