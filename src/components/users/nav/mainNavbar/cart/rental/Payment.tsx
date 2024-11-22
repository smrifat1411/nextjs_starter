import { RentalPay } from './Pay';
import { RentalForBill } from './RentalForBill';

interface Props {
  changeScreen: (x: 'close' | 'default' | 'renting' | 'rentaldone') => void;
  order_id: string;
}

export const RentalPayment = ({ changeScreen, order_id }: Props) => {
  return (
    <div className='flex h-full w-full !font-proxima'>
      <div className='hidden w-full border-r pr-2 md:block'>
        <RentalForBill changeScreen={changeScreen} />
      </div>
      <div className='w-full md:border-l md:pl-2'>
        <RentalPay changeScreen={changeScreen} order_id={order_id} />
      </div>
    </div>
  );
};
