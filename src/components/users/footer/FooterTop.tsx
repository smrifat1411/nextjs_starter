import React from 'react';
import Image from 'next/image';
import { ArrowRightIcon } from '@radix-ui/react-icons';
import { ArrowRightOutlined } from '@ant-design/icons';

const FooterTop = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className='z-20 flex h-[110px] items-center bg-primary p-4 text-white md:px-12 md:py-4'>
      <div className='z-20 flex w-full items-center justify-center md:justify-between'>
        <div className='z-20 flex md:items-start md:gap-4'>
          <Image
            alt='logo in footer position'
            src={'/icons/envelop.svg'}
            width={64}
            height={64}
            className='size-[32px] md:size-[64px]'
          />
          <div className='flex flex-col'>
            <div className='flex items-baseline gap-2'>
              <div className='text-white'>{`Subscribe to our Newsletter`}</div>
              <ArrowRightOutlined size={28} />
            </div>
            <div className='text-[12px]'>{`Get all the latest information on new arrival product, sales & offer`}</div>
          </div>
        </div>
        <div className='hidden md:flex '>
          <Image
            alt='logo in footer position'
            src={'/icons/footerTop/r1.svg'}
            width={24}
            height={24}
            className='h-[40px] w-[160px]'
          />
          <Image
            alt='logo in footer position'
            src={'/icons/footerTop/r6.svg'}
            width={24}
            height={24}
            className='h-[40px] w-[100px]'
          />
          <Image
            alt='logo in footer position'
            src={'/icons/footerTop/r5.svg'}
            width={24}
            height={24}
            className='h-[20px] w-[100px]'
          />
          <Image
            alt='logo in footer position'
            src={'/icons/footerTop/r1.svg'}
            width={24}
            height={24}
            className='h-[20px] w-[100px]'
          />
          <Image
            alt='logo in footer position'
            src={'/icons/footerTop/r1.svg'}
            width={24}
            height={24}
            className='h-[40px] w-[160px]'
          />
          <Image
            alt='logo in footer position'
            src={'/icons/footerTop/r1.svg'}
            width={24}
            height={24}
            className='h-[50px] w-[140px]'
          />
          <Image
            alt='logo in footer position'
            src={'/icons/footerTop/r1.svg'}
            width={24}
            height={24}
            className='h-[30px] w-[160px]'
          />
        </div>
        <div className='hidden cursor-pointer md:flex' onClick={scrollToTop}>
          <div className='whitespace-nowrap uppercase '>{`Back to Top`}</div>
          <Image
            alt='logo in footer position'
            src={'/icons/ArrowUp.svg'}
            width={24}
            height={24}
            className='size-[24px]'
          />
        </div>
      </div>
    </div>
  );
};

export default FooterTop;
