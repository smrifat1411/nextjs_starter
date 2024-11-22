'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { Input, Modal, Slider, SliderSingleProps } from 'antd';
import { useQueryParamsContext } from '@/contexts';

export const Filter: React.FC = () => {
  const places = [
    {
      url: '/places/SF.svg',
      title: 'San Fransisco',
    },
    {
      url: '/places/LA.svg',
      title: 'Los Angeles',
    },
    {
      url: '/places/NY.svg',
      title: 'New York',
    },
    {
      url: '/places/LV.svg',
      title: 'Las Vegas',
    },
    {
      url: '/places/HT.svg',
      title: 'Houston',
    },
    {
      url: '/places/CL.svg',
      title: 'California',
    },
    {
      url: '/places/LA.svg',
      title: 'Los Angeles',
    },
  ];
  const marks: SliderSingleProps['marks'] = {
    0: {
      label: <strong className='!font-proxima'>$0</strong>,
    },
    100: {
      label: <strong className='!font-proxima'>$10000</strong>,
    },
  };

  const { queryParams, setQueryParams } = useQueryParamsContext();
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const onRangeChange = (value: number[]) => {
    setMinPrice(((value[0] ?? 0) * 10000) / 100);
    setMaxPrice(((value[1] ?? 100) * 10000) / 100);
  };
  const [rentalSelected, setRentalSelected] = useState(true);
  const [purchaseSelected, setPurchaseSelected] = useState(true);
  const [open, setOpen] = useState(false);

  const handleOk = () => {
    const updatedWhere = { ...queryParams?.query?.where };

    if (purchaseSelected && rentalSelected) {
      updatedWhere.availableForSelling = true;
      updatedWhere.availableForRenting = true;
    } else if (rentalSelected) {
      updatedWhere.availableForRenting = true;
      updatedWhere.availableForSelling = undefined;
    } else if (purchaseSelected) {
      updatedWhere.availableForSelling = true;
      updatedWhere.availableForRenting = undefined;
    }

    if (minPrice <= maxPrice && minPrice >= 0 && maxPrice >= 0) {
      updatedWhere.price = {
        min: minPrice,
        max: maxPrice,
      };
    } else {
      updatedWhere.price = {
        min: maxPrice,
        max: minPrice,
      };
    }

    setQueryParams({
      query: {
        ...queryParams?.query,
        where: updatedWhere,
      },
    });
    setOpen(false);
  };

  return (
    <>
      <div
        className='cursor-pointer duration-200 hover:scale-105'
        onClick={() => setOpen(true)}
      >
        <Image
          src={'/icons/Funnel.svg'}
          alt={'Main Logo'}
          className='h-[18px] w-[18px]'
          width={100}
          height={100}
        />
      </div>
      <Modal
        title={
          <div className='w-full border-b pb-1 text-center !font-proxima font-semibold'>
            Filters
          </div>
        }
        style={{ top: 40 }}
        width={800}
        open={open}
        okButtonProps={{ className: '!font-proxima' }}
        cancelButtonProps={{ className: '!font-proxima' }}
        okText={'Apply Filter'}
        onOk={() => handleOk()}
        onCancel={() => setOpen(false)}
      >
        <div className='flex flex-col gap-2 !font-proxima'>
          <div className='flex-flex-col'>
            <div className='py-2'>
              <div className='font-bold'>PLACE</div>
              <div className='text-xs text-gray-400'>
                Select places to help show us trending party type in your
                locality
              </div>
            </div>
            <div className='my-2 flex gap-2 overflow-x-auto overflow-y-hidden scrollbar-hide'>
              {places?.map((place: any, index: number) => {
                return (
                  <PlaceChip
                    key={index}
                    url={place?.url}
                    title={place?.title}
                  />
                );
              })}
            </div>
          </div>
          <hr />
          <div className='flex-flex-col'>
            <div className='py-2'>
              <div className='font-bold'>PRICE RANGE</div>
              <div className='text-xs text-gray-400'>
                Price range will help you to find the specific product you are
                looking for
              </div>
            </div>
            <div>
              <div className='flex h-12 w-full items-end justify-between gap-[0.1rem] overflow-hidden'>
                {Array.from({ length: 100 })?.map((bar: any, index: number) => {
                  return (
                    <BlackBar
                      key={index}
                      height={Math.floor(Math.random() * (12 - 5 + 1)) + 6}
                    />
                  );
                })}
              </div>
              <Slider
                styles={{
                  track: {
                    background: 'transparent',
                  },
                  tracks: {
                    background: `#c7675e`,
                  },
                }}
                range
                onChange={onRangeChange}
                marks={marks}
                value={[(minPrice * 100) / 10000, (maxPrice * 100) / 10000]}
              />
            </div>
            <div className='flex gap-2'>
              <Input
                key={'min'}
                className='h-10'
                prefix={<span className='text-xs text-gray-600'>Min $</span>}
                value={minPrice}
                onChange={(e) => setMinPrice(+e.target.value)}
              />
              <Input
                key={'max'}
                className='h-10'
                prefix={<span className='text-xs text-gray-600'>Max $</span>}
                value={maxPrice}
                onChange={(e) => setMaxPrice(+e.target.value)}
              />
            </div>
          </div>
          <hr />
          <div className='flex-flex-col'>
            <div className='py-2'>
              <div className='font-bold'>PRODUCT TYPE</div>
              <div className='text-xs text-gray-400'>
                Select Type of order like Rental or Purchase
              </div>
            </div>
            <div className='flex gap-2'>
              <div
                onClick={() => setRentalSelected(!rentalSelected)}
                className={`${rentalSelected ? 'border-[#c7675e] text-black' : 'text-gray-400'} flex cursor-pointer items-baseline justify-center gap-2 border px-4 py-2 hover:bg-slate-50`}
              >
                {rentalSelected ? (
                  <div className='h-3 w-3 rounded-full border bg-[#c7675e]'></div>
                ) : (
                  <div className='h-3 w-3 rounded-full border'></div>
                )}
                <span className=''>Rental</span>
              </div>
              <div
                onClick={() => setPurchaseSelected(!purchaseSelected)}
                className={`${purchaseSelected ? 'border-[#c7675e] text-black' : 'text-gray-400'} flex cursor-pointer items-baseline justify-center gap-2 border px-4 py-2 hover:bg-slate-50`}
              >
                {purchaseSelected ? (
                  <div className='h-3 w-3 rounded-full border bg-[#c7675e]'></div>
                ) : (
                  <div className='h-3 w-3 rounded-full border'></div>
                )}
                <span>Purchase</span>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

const PlaceChip = (params: any) => {
  return (
    <div className='flex cursor-pointer flex-col items-center justify-center gap-2 text-gray-400 duration-300 hover:text-black'>
      <div className='h-16 w-20 overflow-hidden rounded-sm border hover:border-blue-500'>
        <Image src={params?.url} alt='image' width={100} height={100} />
      </div>
      <div className='max-w-20 text-center text-xs leading-3'>
        {params?.title}
      </div>
    </div>
  );
};

const BlackBar = (params: any) => {
  return (
    <div
      className={`min-h-5 w-1.5 h-${params?.height} cursor-pointer border-2 border-transparent bg-black hover:border-blue-500`}
    ></div>
  );
};
