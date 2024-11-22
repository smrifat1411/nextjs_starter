'use client';
import Image from 'next/image';
import { Drawer } from 'antd';
import { useState } from 'react';
import { Search } from './Search';

export const SearchMobile = () => {
  const [visible, setVisible] = useState(false);
  const handleClose = () => {
    setVisible(false);
  };
  return (
    <>
      <div onClick={() => setVisible(!visible)}>
        <Image
          src={'/icons/MagnifyingGlass.svg'}
          className='h-[24px] w-[24px]'
          alt={'User Icon'}
          width={100}
          height={100}
        />
      </div>

      <Drawer
        title={<span>Search and Filter Products</span>}
        className='rounded-b-xl !font-proxima'
        placement={'top'}
        height={'150px'}
        onClose={handleClose}
        open={visible}
        footer={null}
        onKeyDown={(e) => {
          if (e.key == 'Enter') handleClose();
        }}
      >
        <Search />
      </Drawer>
    </>
  );
};
