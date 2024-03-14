import SiderContent from '@/app/(main)/LayoutComponents/DrawerContent';
import { AlignRightOutlined } from '@ant-design/icons';
import { Button, Drawer } from 'antd';
import React, { useState } from 'react'

export default function DrawerComponent() {
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
      setOpen(true);
    };
  
    const onClose = () => {
      setOpen(false);
    };
  
    return (
      <>
        <Button type="primary" onClick={showDrawer} icon={<AlignRightOutlined />}/>
        <Drawer style={{backgroundColor: "black", color: "whitesmoke"}} placement='right' onClose={onClose} open={open}>
         <SiderContent />
        </Drawer>
      </>
    );
}