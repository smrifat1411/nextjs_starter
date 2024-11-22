import { useGetPurchaseById } from '@/apis';
import { Spin } from 'antd';
import { EmptyMark } from '@/components/common';
import { CartRentItem } from '@/components/product';
import { CollectionCartItem } from '@/components/collection';

interface Props {
  changeScreen: (x: 'close' | 'default' | 'purchasing') => void;
  order_id?: string;
}

export const PurchasedAfterOrder = ({ changeScreen, order_id }: Props) => {
  const { data, isLoading } = useGetPurchaseById(order_id);
  
  if (isLoading) {
    return (
      <div className='flex h-24 w-full items-center justify-center'>
        <Spin />
      </div>
    );
  } else
    return (
      <div className='flex flex-col gap-2'>
        <div className='py-2'>
          <div className='font-bold'>Purchase</div>
          <div className='text-gray-400'>
            Delivery will be done in best possible time
          </div>
        </div>
        <div className='h-[500px] overflow-y-scroll scrollbar-hide'>
          {!isLoading &&
          (data?.items?.length || data?.collectionItems?.length) > 0 ? (
            <div className='mb-2 flex w-fit items-center gap-2 px-2'>
              <input
                type='checkbox'
                id='all'
                className='cursor-pointer rounded-sm'
                checked={true}
              />
              <label htmlFor='all'>Select All</label>
            </div>
          ) : (
            <EmptyMark message='No Products to Buy!' />
          )}
          <div className='flex flex-col gap-2'>
            {data?.items?.map((d: any) => {
              return (
                <CartRentItem
                  key={d?.id}
                  item={d}
                  type='purchase'
                  isSelected={true}
                  onSelect={() => {}}
                  remove={() => {}}
                  increaseQuantity={() => {}}
                  decreaseQuantity={() => {}}
                  changeQuantity={(newQuantity: number) => {}}
                  addToWishList={() => {}}
                  removeFromWishlist={() => {}}
                  onLoad={''}
                />
              );
            })}
          </div>
          <div className='h-4'></div>
          <div className='flex flex-col gap-2'>
            {data?.collectionItems?.map((d: any) => {
              return (
                <CollectionCartItem
                  key={d?.id}
                  item={d}
                  isSelected={true}
                  onSelect={() => {}}
                  remove={() => {}}
                  increaseQuantity={() => {}}
                  decreaseQuantity={() => {}}
                  changeQuantity={(newQuantity: number) => {}}
                  // addToWishList={() => addToWishList(d)}
                  // removeFromWishlist={() => removeFromWishlist(d)}
                  onLoad={''}
                />
              );
            })}
          </div>
        </div>
        <div>
          <div className='w-full cursor-pointer rounded-md py-2 text-center text-gray-600 duration-200'></div>
        </div>
      </div>
    );
};
