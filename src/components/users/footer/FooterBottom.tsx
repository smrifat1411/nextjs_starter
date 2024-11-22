import React from 'react';
import Image from 'next/image';

const FooterBottom = () => {
  return (
    <div className='flex flex-col-reverse items-center justify-between border-t px-4 py-4 text-gray2 md:flex-row md:px-12'>
      <div className='pb-[10px] md:pb-0'>{`fiesta.com.Pvt Ltd`}</div>
      <div className='flex flex-col items-center gap-[20px] md:flex-row'>
        <div>{`We're using safe payment`}</div>
        <div className='flex items-center gap-4'>
          <Image
            alt='logo in footer position'
            src={'/icons/paymentType/visa.svg'}
            width={24}
            height={24}
            className='h-[17px] w-[40px] md:w-[52px]'
          />
          <Image
            alt='logo in footer position'
            src={'/icons/paymentType/mastercard.svg'}
            width={24}
            height={24}
            className='h-[19px] w-[32px]'
          />
          <Image
            alt='logo in footer position'
            src={'/icons/paymentType/american.svg'}
            width={24}
            height={24}
            className='h-[30px] w-[40px] md:w-[80px]'
          />
          <Image
            alt='logo in footer position'
            src={'/icons/paymentType/paypal.svg'}
            width={24}
            height={24}
            className='h-[17px] w-full'
          />
          <Image
            alt='logo in footer position'
            src={'/icons/paymentType/discover.svg'}
            width={24}
            height={24}
            className='h-[14px] w-[71px]'
          />
        </div>
      </div>
    </div>
  );
};

export default FooterBottom;
