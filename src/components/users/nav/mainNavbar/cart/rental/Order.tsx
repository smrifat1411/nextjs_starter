import { RentalBilling } from './Billing';
import { RentalForBill } from './RentalForBill';

interface Props {
  changeScreen: (
    x: 'close' | 'default' | 'renting' | 'rentalpayment' | 'rentaldone'
  ) => void;
  setOrder: (x: string) => void;
}

export const RentalOrder = ({ changeScreen, setOrder }: Props) => {
  return (
    <div className='flex h-full w-full !font-proxima'>
      <div className='hidden w-full border-r pr-2 md:block'>
        <RentalForBill changeScreen={changeScreen} />
      </div>
      <div className='w-full md:border-l md:pl-2'>
        <RentalBilling changeScreen={changeScreen} setOrder={setOrder} />
      </div>
    </div>
  );
};
