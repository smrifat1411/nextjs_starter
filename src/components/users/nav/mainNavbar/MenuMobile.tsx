'use client';
import { useGetAllSubCategoriess, useGetCategoriesOption } from '@/apis';
import { useQueryParamsContext } from '@/contexts';
import { Collapse, CollapseProps, Spin } from 'antd';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Image from 'next/image';
import { AccountMenu } from './AccountMenuMobile';

const CategoryMenu = (params: any) => {
  const { data, isLoading } = useGetAllSubCategoriess({
    query: {
      where: {
        category: params?.category_id,
      },
      page: 1,
      limit: 10,
    },
  });

  const { setQueryParams } = useQueryParamsContext();

  const onSubCategoryClick = (sid: string) => {
    setQueryParams({
      query: {
        where: {
          subCategory: sid,
        },
        page: 1,
        limit: 10,
      },
    });
    params?.setIsMenuOpen(false);
  };

  return (
    <div className='rounded-5xl grid w-full grid-cols-3 items-start gap-2 p-0'>
      {isLoading && (
        <div className='flex w-full justify-center'>
          <Spin />
        </div>
      )}
      {!isLoading &&
        data?.data?.map((sc: any, index: number) => {
          return (
            <div
              key={index}
              className='flex cursor-pointer flex-col items-center justify-center text-gray-400 duration-300 hover:scale-105 hover:text-black'
              onClick={() => onSubCategoryClick(sc?.id)}
            >
              <div className='h-16 w-16 overflow-hidden rounded-md shadow-md'>
                <Image src={sc.image} alt='image' width={100} height={100} />
              </div>
              <div className='max-w-14 pt-1 text-center text-[0.6rem] leading-3'>
                {sc?.name}
              </div>
            </div>
          );
        })}
    </div>
  );
};

const CATEGORIES = (params: any) => {
  const { data } = useGetCategoriesOption();
  const items: CollapseProps['items'] = data?.map(
    (category: any, key: number) => {
      return {
        key: key,
        label: <div className='border-b pb-4'>{category?.label}</div>,
        children: (
          <CategoryMenu
            setIsMenuOpen={params?.setIsMenuOpen}
            category_id={category?.value}
          />
        ),
      };
    }
  );
  return (
    <div className=''>
      <Collapse
        // size='middle'
        items={items}
        expandIconPosition='end'
        className='!font-proxima'
        // ghost
        // bordered
        // accordion
      />
    </div>
  );
};

const MENU = (params: any) => {
  return (
    <div className=''>
      <AccountMenu setIsMenuOpen={params?.setIsMenuOpen} />
    </div>
  );
};

export const MenuMobile = (params: any) => {
  const router = useRouter();

  const gotoHere = (link: string) => {
    router.push(link);
  };

  const [activeTab, setActiveTab] = useState<string>('tab1');

  const renderContent = () => {
    switch (activeTab) {
      case 'tab1':
        return <CATEGORIES setIsMenuOpen={params?.setIsMenuOpen} />;
      case 'tab2':
        return <MENU setIsMenuOpen={params?.setIsMenuOpen} />;
      default:
        return null;
    }
  };

  return (
    <div className='z-100 mx-auto w-full'>
      <div className='mb-4 flex justify-center'>
        <button
          className={`w-full px-4 py-2 font-semibold ${activeTab === 'tab1' ? 'border-t-2 border-[#C7675E] text-[#C7675E]' : 'border text-gray-400'}`}
          onClick={() => setActiveTab('tab1')}
        >
          CATEGORIES
        </button>
        <button
          className={`w-full px-4 py-2 font-semibold ${activeTab === 'tab2' ? 'border-t-2 border-[#C7675E] text-[#C7675E]' : 'border text-gray-400'}`}
          onClick={() => setActiveTab('tab2')}
        >
          MENU
        </button>
      </div>
      <div className='-px-4'>{renderContent()}</div>
    </div>
  );
};
