import { PurchaseBilling } from './Billing';
import { PurchasedForBill } from './PurchaseForBill';

interface Props {
  changeScreen: (
    x: 'close' | 'default' | 'purchasing' | 'purchasepayment'
  ) => void;
  setOrder: (x: string) => void;
}

export const PurchaseOrder = ({ changeScreen, setOrder }: Props) => {
  return (
    <div className='flex h-full w-full !font-proxima'>
      <div className='hidden w-full border-r pr-2 md:block'>
        <PurchasedForBill changeScreen={changeScreen} />
      </div>
      <div className='w-full md:border-l md:pl-2'>
        <PurchaseBilling changeScreen={changeScreen} setOrder={setOrder} />
      </div>
    </div>
  );
};
