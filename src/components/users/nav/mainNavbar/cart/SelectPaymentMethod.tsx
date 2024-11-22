import { useGetAllPaymentMethod } from '@/apis';
import { AddPaymentMethod } from '@/components/paymentMethod';
import { RightOutlined } from '@ant-design/icons';
import { CardStackIcon } from '@radix-ui/react-icons';
import { theme } from 'antd';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface Props {
  setPmId: (x: string) => void;
}

export const SelectPaymentMethod = ({ setPmId }: Props) => {
  const {
    token: { colorPrimary },
  } = theme.useToken();
  const { data, isLoading, isRefetching, refetch } = useGetAllPaymentMethod();
  // const { data: defaultMethod } = useGetAllPaymentMethod({
  //   query: {
  //     where: {
  //       isDefault: true,
  //     },
  //   },
  // });
  const defaultMethod = data?.find((d:any)=>d?.isDefault==true)
  const [collapsed, setCollapsed] = useState(true);
  const [selectedCard, setSelectedCard] = useState<any>(defaultMethod || data?.at(0));
  
  useEffect(() => {
    if (defaultMethod || data?.at(0)) {
      setSelectedCard(defaultMethod || data?.at(0));
      setPmId(defaultMethod?.id || data?.at(0)?.id);
    }
  }, [isLoading, isRefetching, defaultMethod]);

  return (
    <div className='w-full'>
    <div className='w-full cursor-pointer rounded-md border'>
      <div
        onClick={() => setCollapsed(!collapsed)}
        className='flex justify-between px-4 text-gray-600'
      >
        <div className='hidden items-center gap-2 py-4 text-[16px] font-bold md:flex'>
          <CardStackIcon /> Payment Method
        </div>
        <div className='flex items-center gap-2 py-4 text-[16px] font-bold md:hidden'>
          <CardStackIcon /> Payment
          <br />
          Method
        </div>
        <div className='flex items-center gap-4'>
          {selectedCard ? (
            <div className='max-h-full w-full cursor-pointer md:w-40'>
              <div
                className={`my-2 flex max-h-full w-full flex-col gap-1 overflow-hidden rounded-md border border-gray-600 bg-black bg-opacity-5 p-1 hover:border-gray-600 md:relative md:flex-row md:gap-2`}
              >
                <div className='flex items-center gap-1'>
                  <div
                    className={`h-3 w-3 rounded-full border border-blue-600 bg-blue-600`}
                  ></div>
                  <div className={`w-8 md:absolute md:right-2 md:top-2`}>
                    {selectedCard?.card?.brand == 'visa' && (
                      <Image
                        src={'/icons/paymentType/visa.svg'}
                        alt=''
                        width={100}
                        height={100}
                      />
                    )}
                    {selectedCard?.card?.brand == 'mastercard' && (
                      <Image
                        src={'/icons/paymentType/mastercard.svg'}
                        alt=''
                        width={60}
                        height={60}
                      />
                    )}
                  </div>
                </div>
                <div className='flex flex-col'>
                  <div className='text-[0.5rem] font-bold text-gray-800'>
                    ************{selectedCard?.card?.last4}
                  </div>
                  <div className='text-left text-[0.5rem] leading-3 text-gray-500'>
                    {selectedCard?.billing_details?.name}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className='text-sm'>Select a Card</div>
          )}
          <RightOutlined rotate={collapsed ? 0 : 90} />
        </div>
      </div>
      {!collapsed && (
        <div className='p-4'>
          <AddPaymentMethod
            refetch={async () => await refetch()}
            component={
              <div className='my-2 w-full cursor-pointer rounded-sm bg-gray-100 py-1.5 text-center text-sm hover:bg-gray-200'>
                Add Payment Method
              </div>
            }
          />
          {data?.length > 0 ? <>
          <div className='text-[0.8rem] font-bold text-gray-600'>
            Select one from your cards
          </div>
          <div className='grid grid-cols-3 gap-2'>
            {data?.map((method: any, key: number) => {
              return (
                <CardChip
                  key={key}
                  method={method}
                  selected={selectedCard?.id == method?.id}
                  onClick={() => {
                    setSelectedCard(method);
                    setPmId(method?.id);
                  }}
                />
              );
            })}
          </div>
          </> : <></>}
        </div>
      )}
    </div>
    {selectedCard && <div className='text-xs text-gray-400'>Payment will be done using your selected method.</div>}
    </div>
  );
};

const CardChip = (params: any) => {
  return (
    <div onClick={params?.onClick} className='max-h-full w-full cursor-pointer'>
      <div
        className={`my-2 flex max-h-full w-full flex-col gap-1 overflow-hidden rounded-md border p-1 hover:border-gray-600 md:relative md:flex-row md:gap-2 ${params?.selected ? 'border-gray-600 bg-black bg-opacity-5' : ''}`}
      >
        <div className='flex items-center gap-1'>
          <div
            className={`h-3 w-3 rounded-full border border-blue-600 ${params?.selected ? 'bg-blue-600' : ''}`}
          ></div>
          <div className={`w-8 md:absolute md:right-2 md:top-2`}>
            {params?.method?.card?.brand == 'visa' && (
              <Image
                src={'/icons/paymentType/visa.svg'}
                alt=''
                width={100}
                height={100}
              />
            )}
            {params?.method?.card?.brand == 'mastercard' && (
              <Image
                src={'/icons/paymentType/mastercard.svg'}
                alt=''
                width={60}
                height={60}
              />
            )}
          </div>
        </div>
        <div className='flex flex-col'>
          <div className='text-[0.5rem] font-bold text-gray-800'>
            ************{params?.method?.card?.last4}
          </div>
          <div className='text-left text-[0.5rem] leading-3 text-gray-500'>
            {params?.method?.billing_details?.name}
          </div>
        </div>
      </div>
    </div>
  );
};
