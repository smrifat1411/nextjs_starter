import { useState } from 'react';
import { Spin } from 'antd';
import { errorModal } from '@/components';
import { SelectPaymentMethod } from '../SelectPaymentMethod';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCreatePay, useGetPurchaseById, useGetRolesQuery } from '@/apis';
import { useStripe } from '@stripe/react-stripe-js';
import { Role } from '@/enums';

interface Props {
  changeScreen: (x: 'close' | 'default' | 'renting' | 'rentaldone') => void;
  order_id: string;
}

export const RentalPay = ({ changeScreen, order_id }: Props) => {
  const { data } = useGetPurchaseById(order_id);
  const pay = useCreatePay();
  const [onLoad, setOnLoad] = useState(false);
  const [pmId, setPmId] = useState('');
  const stripe = useStripe();

  const handlePay = async () => {
    setOnLoad(true);
    try {
      const result = await pay.mutateAsync({
        paymentMethodId: pmId,
        orderId: order_id,
        type: 'PURCHASE',
      });
      console.log(result);

      const { paymentIntentId, clientSecret } = result;
      const { error: confirmError } =
        await stripe!.confirmCardPayment(clientSecret);

      if (confirmError) {
        errorModal(confirmError);
      } else changeScreen('rentaldone');
    } catch (err) {
      errorModal(err);
    }
    setOnLoad(false);
  };

  const router = useRouter();

  const gotoHere = (link: string) => {
    router.push(link);
  };

  const { data: role } = useGetRolesQuery()

  return (
    <div className='relative flex h-full flex-col justify-between gap-2 !font-proxima'>
      {onLoad && (
        <div className='absolute left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-10'>
          <Spin />
        </div>
      )}
      <div className='flex h-[500px] flex-col gap-4 overflow-y-scroll scrollbar-hide'>
        <div className='my-12 flex h-fit w-full flex-col items-center justify-center gap-4 text-center !font-proxima'>
          <div className='h-[100px] w-[100px]'>
            <Image
              className='h-full w-full'
              src={'/icons/done.svg'}
              alt={''}
              width={100}
              height={100}
            />
          </div>
          <div className='font-bold uppercase'>Thank you for Placing Order</div>
          <div className='max-w-[350px] text-gray-500'>
            You can pay now or can pay in two days from your orders!{' '}
            {role?.includes(Role.USER) && <a href={`/account/purchases${order_id}`}>Go to Orders</a>}
            {role?.includes(Role.TEMP) && <a href={`/guest/purchases${order_id}`}>Go to Orders</a>}
          </div>
        </div>
        <div className='flex flex-col gap-2'>
          <SelectPaymentMethod setPmId={setPmId} />
        </div>
        <div className='flex flex-col gap-2'>
          <div className='font-bold'>Order Summary</div>
          <div>
            <div className='flex justify-between'>
              <div className='text-gray-500'>Total</div>
              <div className='font-bold'>${data?.total}</div>
            </div>
            <hr />
          </div>
          <div>
            <div className='flex justify-between'>
              <div className='text-gray-500'>Delivery Fee</div>
              <div className='font-bold'>${data?.deliveryCharge}</div>
            </div>
            <hr />
          </div>
          <div>
            <div className='flex justify-between'>
              <div className='text-gray-500'>Total Payable</div>
              <div className='font-bold'>${data?.total}</div>
            </div>
            <hr />
          </div>
        </div>
      </div>
      <div className='flex w-full gap-2'>
        <div
          onClick={() => gotoHere('/')}
          className='w-full cursor-pointer rounded-md bg-gray-100 py-2 text-center text-gray-600 duration-200 hover:bg-gray-200'
        >
          Continue Shopping
        </div>
        <div
          onClick={handlePay}
          className='sahadow-md w-full cursor-pointer rounded-sm bg-blue-500 py-2 text-center text-white duration-200 hover:bg-blue-600 hover:shadow-lg'
        >
          Pay Now
        </div>
      </div>
    </div>
  );
};
