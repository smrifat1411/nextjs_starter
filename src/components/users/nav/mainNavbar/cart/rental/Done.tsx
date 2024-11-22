'use client';
import { useGetRolesQuery } from '@/apis';
import { Role } from '@/enums';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface Props {
  changeScreen: (x: 'close') => void;
  order_id: string | undefined;
}

export const RentalDone = ({ changeScreen, order_id }: Props) => {
  const router = useRouter();
  const gotoHere = (link: string) => {
    router.push(link);
    changeScreen('close');
  };
  const { data: role } = useGetRolesQuery()
  return (
    <div className='my-12 flex h-fit w-full flex-col items-center justify-center gap-4 text-center !font-proxima'>
      <div className='h-[200px] w-[200px]'>
        <Image
          className='h-full w-full'
          src={'/icons/done.svg'}
          alt={''}
          width={100}
          height={100}
        />
      </div>
      <div className='font-bold uppercase'>
        Thank you for Submitting reservation request
      </div>
      <div className='max-w-[350px] text-gray-500'>
        We will confirm item availability within <b>23 hours</b>. After
        confirmation you need to pay 10% booking money to hold your items. The
        rest 90% will be charged 3 days before the delivery.
      </div>
      <div className='flex items-center gap-2'>
      {role?.includes(Role.USER) && <div
          onClick={() => gotoHere(`/account/reservations/${order_id}`)}
          className='cursor-pointer rounded-md bg-[#C7675E] px-4 py-2 text-white'
        >
          Go to Order
        </div>}
        {role?.includes(Role.TEMP) && <div
          onClick={() => gotoHere(`/guest/reservations/${order_id}`)}
          className='cursor-pointer rounded-md bg-[#C7675E] px-4 py-2 text-white'
        >
          Go to Order
        </div>}
      </div>
    </div>
  );
};
