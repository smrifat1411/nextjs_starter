import { PurchaseBilling } from './Billing';
import { PurchaseDone } from './Done';
import { PurchasePay } from './Pay';
import { PurchasedAfterOrder } from './PurchaseAfterOrder';
import { PurchasedForBill } from './PurchaseForBill';

interface Props {
  changeScreen: (
    x: 'close' | 'default' | 'purchasing' | 'purchasedone'
  ) => void;
  order_id: string;
}

export const PurchasePayment = ({ changeScreen, order_id }: Props) => {
  return (
    <div className='flex h-full w-full !font-proxima'>
      <div className='hidden w-full border-r pr-2 md:block'>
        <PurchasedAfterOrder changeScreen={changeScreen} order_id={order_id} />
      </div>
      <div className='w-full md:border-l md:pl-2'>
        <PurchasePay changeScreen={changeScreen} order_id={order_id} />
      </div>
    </div>
  );
};
