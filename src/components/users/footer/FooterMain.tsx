import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import FooterBottom from './FooterBottom';
import FooterTop from './FooterTop';

const Footer = () => {
  const navigation = {
    getToKnowUs: [
      { name: 'About Us', link: '/about' },
      { name: 'Contact Us', link: '/contact' },
      { name: 'Why buy from us', link: '/why-buy' },
    ],
    important: [
      { name: 'Your Account', link: '/account/dashboard' },
      { name: 'Your Order', link: '/account/purchases' },
    ],
    customerCare: [
      { name: 'Help Center', link: '/help' },
      { name: 'How to Buy', link: '/how-to-buy' },
      { name: 'Return & refund', link: '/return-refund' },
      { name: 'Terms & Condition', link: '/terms' },
      { name: 'Privacy Policy', link: '/privacy' },
    ],
    followUs: [
      {
        name: 'Facebook',
        link: 'https://facebook.com',
        icon: '/icons/facebook.svg',
      },
      {
        name: 'LinkedIn',
        link: 'https://linkedin.com',
        icon: '/icons/linkedin.svg',
      },
      {
        name: 'Twitter',
        link: 'https://twitter.com',
        icon: '/icons/twitter.svg',
      },
    ],
  };

  return (
    <div className='z-20'>
      <FooterTop />
      <div className='flex flex-col p-4 md:flex-row md:p-12'>
        <div className='flex w-full flex-col md:w-[28%]'>
          <Image
            alt='logo in footer position'
            src={'/logos/logo.svg'}
            width={200}
            height={200}
            className='h-[47px] w-[70px] md:w-[110px]'
          />
          <div className='space-y-[8px] py-5 md:py-[40px]'>
            <h5 className='text-[12px] font-normal text-gray2'>{`Got question? Call us at 09:00AM - 08:00 PM`}</h5>
            <div className='text-[14px] !font-extrabold'>{`0961-154578`}</div>
            <h5 className='text-[12px] font-normal text-gray2'>
              General Question:{' '}
              <span className='text-[#c7675e]'>sales@fiestarow.com</span>
            </h5>
          </div>
        </div>

        <div className='w-full space-y-[14px] text-[13.5px] md:w-[18%]'>
          <div className='!font-extrabold uppercase text-gray2'>{`Get to know us`}</div>
          <ul className='flex flex-col gap-y-[14px] font-normal text-gray2'>
            {navigation.getToKnowUs.map((item) => (
              <li key={item.name}>
                <Link href={item.link}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className='w-full space-y-[14px] text-[13.5px] md:w-[18%]'>
          <div className='!font-extrabold uppercase text-gray2'>{`Important`}</div>
          <ul className='flex flex-col gap-y-[14px] font-normal text-gray2'>
            {navigation.important.map((item) => (
              <li key={item.name}>
                <Link href={item.link}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className='w-full space-y-[14px] text-[13.5px] md:w-[18%]'>
          <div className='!font-extrabold uppercase text-gray2'>{`Customer Care`}</div>
          <ul className='flex flex-col gap-y-[14px] font-normal text-gray2'>
            {navigation.customerCare.map((item) => (
              <li key={item.name}>
                <Link href={item.link}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className='w-full space-y-[14px] text-[13.5px] md:w-[18%]'>
          <div className='!font-extrabold uppercase text-gray2'>Follow Us</div>
          <div className='flex gap-[14px]'>
            {navigation.followUs.map((item) => (
              <Link key={item.name} href={item.link} passHref legacyBehavior>
                <a target='_blank' rel='noopener noreferrer'>
                  <Image
                    alt={`${item.name} icon`}
                    src={item.icon}
                    className='size-[28px]'
                    height={28}
                    width={28}
                  />
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <FooterBottom />
    </div>
  );
};

export default Footer;
