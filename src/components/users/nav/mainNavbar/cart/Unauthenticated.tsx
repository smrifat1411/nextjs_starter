'use client';
import React, { useState } from 'react';
import { Modal, theme } from 'antd';
import Image from 'next/image';

export const Unauthenticated: React.FC = () => {
  const {
    token: { fontFamily },
  } = theme.useToken();
  const [open, setOpen] = useState(false);

  return (
    <div style={{ fontFamily: fontFamily }}>
      <div
        className='cursor-pointer'
        onClick={() => {
          setOpen(true);
        }}
      >
        <Image
          src={'/icons/ShoppingCart.svg'}
          alt={'Shopping Cart Icon'}
          className='h-[24px] w-[24px]'
          width={100}
          height={100}
        />
      </div>
      <Modal
        title={null}
        style={{ top: 0, fontFamily: fontFamily }}
        open={open}
        footer={null}
        onCancel={() => setOpen(false)}
      >
        <div className='flex w-full flex-col gap-4 text-center'>
          <a href='/signin'>Go to Sign In Page</a>
          <div>
            Dont have an Account? <a href='/signup'>Sign up First!</a>
          </div>
        </div>
      </Modal>
    </div>
  );
};
