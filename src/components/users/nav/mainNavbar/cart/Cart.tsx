'use client';
import React, { useState } from 'react';
import { Modal, theme } from 'antd';
import Image from 'next/image';
import { PurchaseDone, PurchaseOrder, PurchasePayment } from './purchase';
import { RentalDone, RentalOrder, RentalPayment } from './rental';
import { PurchaseAndRentals } from './PurchaseAndRentals';

export const Cart: React.FC = () => {
  const {
    token: { fontFamily },
  } = theme.useToken();
  const [open, setOpen] = useState(false);
  const [orderId, setOrderId] = useState<string>('');
  const [screen, setScreen] = useState<
    | 'close'
    | 'default'
    | 'purchasing'
    | 'renting'
    | 'purchasepayment'
    | 'rentalpayment'
    | 'purchasedone'
    | 'rentaldone'
  >('default');

  const changeScreen = (
    screen:
      | 'close'
      | 'default'
      | 'purchasing'
      | 'renting'
      | 'purchasepayment'
      | 'rentalpayment'
      | 'purchasedone'
      | 'rentaldone'
  ) => {
    setScreen(screen);
    if (screen == 'close') setOpen(false);
  };

  return (
    <div style={{ fontFamily: fontFamily }}>
      <div
        className='cursor-pointer'
        onClick={() => {
          setOpen(true);
          setScreen('default');
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
      {/* <Modal
        title={
          <div className='w-full border-b pb-1 text-center !font-proxima text-lg font-semibold'>
            Shopping Cart
          </div>
        }
        style={{ top: 0, fontFamily: fontFamily }}
        width={'85%'}
        open={open}
        footer={null}
        onCancel={() => setOpen(false)}
      >
        {screen === 'default' && (
          <PurchaseAndRentals changeScreen={changeScreen} />
        )}
        {screen === 'purchasing' && (
          <PurchaseOrder changeScreen={changeScreen} setOrder={setOrderId} />
        )}
        {screen === 'renting' && (
          <RentalOrder changeScreen={changeScreen} setOrder={setOrderId} />
        )}
        {screen === 'purchasepayment' && (
          <PurchasePayment changeScreen={changeScreen} order_id={orderId} />
        )}
        {screen === 'rentalpayment' && (
          <RentalPayment changeScreen={changeScreen} order_id={orderId} />
        )}
        {screen === 'purchasedone' && (
          <PurchaseDone order_id={orderId} changeScreen={changeScreen} />
        )}
        {screen === 'rentaldone' && (
          <RentalDone order_id={orderId} changeScreen={changeScreen} />
        )}
      </Modal> */}
    </div>
  );
};

export default Cart;
