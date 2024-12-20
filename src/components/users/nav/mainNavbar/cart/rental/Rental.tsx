import { Loading3QuartersOutlined, PlusOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import {
  useAddItemToWishlist,
  useGetAllSetting,
  useGetReservationItems,
  useRemoveItemFromWishlist,
  useRemoveItemsFromReservation,
  useSelectItemsInReservation,
  useUpdateItemInReservation,
} from '@/apis';
import { Spin } from 'antd';
import { CartRentItem } from '@/components';
import { EmptyMark, errorModal } from '@/components/common';
import { useTooltipNotificationContext } from '@/contexts';
import { useRouter } from 'next/navigation';

interface Props {
  changeScreen: (x: 'close' | 'default' | 'renting') => void;
}

export const Rental = ({ changeScreen }: Props) => {
  const { data, isLoading, isFetching, refetch } = useGetReservationItems();
  const removeItems = useRemoveItemsFromReservation();
  const updateItem = useUpdateItemInReservation();
  const [onLoad, setOnLoad] = useState('');
  const [allSelectLoad, setAllSelectLoad] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const selectAllItems = useSelectItemsInReservation();
  const { openReservation, setOpenWishlist, setWishlistProductUrl } =
    useTooltipNotificationContext();
  const addItemToWishList = useAddItemToWishlist();
  const removeItemFromWishList = useRemoveItemFromWishlist();

  useEffect(() => {
    if (!isLoading) {
      setSelectedItems(
        data?.items
          ?.filter((d: any) => d?.isPicked === true)
          ?.map((d: any) => d?.id)
      );
    }
  }, [isLoading, isFetching]);

  useEffect(() => {
    async function fet() {
      await refetch();
    }
    fet();
  }, [openReservation]);

  const update = async (value: any) => {
    try {
      await updateItem.mutateAsync(value);
    } catch (err) {
      errorModal(err);
    }
  };

  const handleSelectAll = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAllSelectLoad(true);
    await selectAllItems.mutateAsync({
      flag: event.target.checked,
    });
    await refetch();
    setAllSelectLoad(false);
  };

  const handleItemSelect = async (id: string) => {
    setOnLoad(id);
    if (selectedItems?.includes(id)) {
      await update({
        itemId: id,
        isPicked: false,
      });
      // setSelectedItems(selectedItems?.filter((itemId: any) => itemId !== id));
    } else {
      await update({
        itemId: id,
        isPicked: true,
      });
      // setSelectedItems([...selectedItems, id]);
    }
    await refetch();
    setOnLoad('');
  };

  const updateQuantity = async (id: string, newQuantity: number) => {
    setOnLoad(id);
    await update({
      itemId: id,
      quantity: Math.max(1, newQuantity),
    });
    await refetch();
    setOnLoad('');
  };

  const addToWishList = async (item: any) => {
    setOnLoad(item?.id);
    try {
      await addItemToWishList.mutateAsync({
        productId: item?.product?.id,
      });
      setOpenWishlist(true);
      setWishlistProductUrl(item?.product?.images?.at(0));
      setTimeout(() => {
        setOpenWishlist(false);
      }, 1500);
    } catch (err) {
      errorModal(err);
    }
    await refetch();
    setOnLoad('');
  };

  const removeFromWishlist = async (item: any) => {
    setOnLoad(item?.id);
    try {
      await removeItemFromWishList.mutateAsync({
        itemId: item?.id,
        productId: item?.product?.id,
      });
    } catch (err) {
      errorModal(err);
    }
    await refetch();
    setOnLoad('');
  };

  const removeFromReservation = async (id: string) => {
    setOnLoad(id);
    try {
      await removeItems.mutateAsync({
        items: [id],
      });
    } catch (err) {
      errorModal(err);
    }
    await refetch();
    setOnLoad('');
  };

  const router = useRouter();
  const gotoHere = (link: string) => {
    router.push(link);
  };

  const { data: settings } = useGetAllSetting();

  return (
    <div className='flex flex-col gap-2 !font-proxima'>
      <div className='py-2'>
        <div className='font-bold'>Rentals</div>
        <div className='text-gray-400'>
          You can place other orders while we confirm availability!
        </div>
      </div>
      <div className='h-[300px] overflow-y-scroll scrollbar-hide md:h-[400px]'>
        {!isLoading &&
        (data?.items?.length || data?.collectionItems?.length) > 0 ? (
          <div className='mb-2 flex w-fit items-center gap-2 px-2'>
            {allSelectLoad ? (
              <Loading3QuartersOutlined spin />
            ) : (
              <input
                type='checkbox'
                id='all'
                className='cursor-pointer rounded-sm'
                checked={selectedItems?.length === data?.items?.length}
                onChange={handleSelectAll}
              />
            )}
            <label htmlFor='all'>Select All</label>
          </div>
        ) : !isLoading ? (
          <EmptyMark message='No Products to Rent!' />
        ) : (
          <div className='flex h-24 w-full items-center justify-center'>
            <Spin />
          </div>
        )}
        <div className='flex flex-col gap-2'>
          {data?.items?.map((d: any) => {
            return (
              <CartRentItem
                key={d?.id}
                item={d}
                type='rental'
                isSelected={selectedItems?.includes(d?.id)}
                onSelect={() => handleItemSelect(d?.id)}
                remove={() => removeFromReservation(d?.id)}
                increaseQuantity={() => updateQuantity(d?.id, +d?.quantity + 1)}
                decreaseQuantity={() => updateQuantity(d?.id, +d?.quantity - 1)}
                changeQuantity={(newQuantity: number) =>
                  updateQuantity(d?.id, +newQuantity)
                }
                addToWishList={() => addToWishList(d)}
                removeFromWishlist={() => removeFromWishlist(d)}
                onLoad={onLoad}
              />
            );
          })}
        </div>
      </div>
      <div>
        <div
          onClick={() => {
            changeScreen('close');
            gotoHere('/');
          }}
          className='w-full cursor-pointer rounded-md bg-gray-100 py-2 text-center text-gray-600 duration-200 hover:bg-gray-200'
        >
          <PlusOutlined />
          Add More Item
        </div>
        <div className='h-12 text-xs text-gray-500'>
          <div>
            *Free delivery on Order ${settings?.freeDeliveryMinimumOrderAmount}{' '}
            or above
          </div>
          <div>
            *Setup & decoration service not included. available to add-on at
            checkout
          </div>
        </div>
        <hr />
        <div className='mt-2 flex justify-between'>
          <div>
            <div className='text-xs text-gray-400'>Total</div>
            <div className='text-lg font-bold text-gray-800'>
              ${data?.total}
            </div>
          </div>
          <div
            onClick={() => changeScreen('renting')}
            className={`h-fit rounded-sm ${selectedItems?.length == 0 ? 'cursor-default bg-blue-300 hover:bg-blue-300' : 'cursor-pointer bg-blue-500 hover:bg-blue-600 hover:shadow-lg'} px-4 py-2 text-white shadow-md duration-200`}
          >
            Continue to Confirm Availability
          </div>
        </div>
      </div>
    </div>
  );
};
