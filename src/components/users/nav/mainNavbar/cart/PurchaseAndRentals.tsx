'use client';
import React, { useState } from 'react';
import { Purchase } from './purchase';
import { Rental } from './rental';

interface Props {
  changeScreen: (x: 'close' | 'default' | 'purchasing' | 'renting') => void;
}

export const PurchaseAndRentals = ({ changeScreen }: Props) => {
  const [activeTab, setActiveTab] = useState<string>('tab1');
  const renderContent = () => {
    switch (activeTab) {
      case 'tab1':
        return <Purchase changeScreen={changeScreen} />;
      case 'tab2':
        return <Rental changeScreen={changeScreen} />;
      default:
        return null;
    }
  };
  return (
    <>
      <div className='mb-4 flex justify-center !font-proxima md:hidden'>
        <button
          className={`w-full px-1 py-2 font-semibold ${activeTab === 'tab1' ? 'border-t-2 border-[#C7675E] text-[#C7675E]' : 'border text-gray-400'}`}
          onClick={() => setActiveTab('tab1')}
        >
          PURCHASE
        </button>
        <button
          className={`w-full px-1 py-2 font-semibold ${activeTab === 'tab2' ? 'border-t-2 border-[#C7675E] text-[#C7675E]' : 'border text-gray-400'}`}
          onClick={() => setActiveTab('tab2')}
        >
          RENTAL
        </button>
      </div>
      <div className='md:hidden'>{renderContent()}</div>
      <div className='hidden h-full w-full !font-proxima md:flex'>
        <div className='w-full border-r pr-2'>
          <Purchase changeScreen={changeScreen} />
        </div>
        <div className='w-full border-l pl-2'>
          <Rental changeScreen={changeScreen} />
        </div>
      </div>
    </>
  );
};
