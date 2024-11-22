import { Loading3QuartersOutlined, PlusOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import {
  useAddItemToWishlist,
  useGetCartItems,
  useRemoveItemFromWishlist,
  useRemoveItemFromCart,
  useUpdateItemInCart,
  useSelectItemsInCart,
  useRemoveCollectionFromCart,
  useUpdateCollectionInCart,
} from '@/apis';
import { Spin } from 'antd';
import { EmptyMark, errorModal } from '@/components/common';
import { useTooltipNotificationContext } from '@/contexts';
import { useRouter } from 'next/navigation';
import { CartRentItem } from '@/components/product';
import { CollectionCartItem } from '@/components/collection';

interface Props {
  changeScreen: (x: 'close' | 'default' | 'purchasing') => void;
}

export const PurchasedForBill = ({ changeScreen }: Props) => {
  const { data, isLoading, isFetching, refetch } = useGetCartItems();
  const removeItems = useRemoveItemFromCart();
  const updateItem = useUpdateItemInCart();
  const removeCollections = useRemoveCollectionFromCart();
  const updateACollection = useUpdateCollectionInCart();
  const [onLoad, setOnLoad] = useState('');
  const [allSelectLoad, setAllSelectLoad] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const selectAllItems = useSelectItemsInCart();
  const { openCart, setOpenWishlist, setWishlistProductUrl } =
    useTooltipNotificationContext();
  const addItemToWishList = useAddItemToWishlist();
  const removeItemFromWishList = useRemoveItemFromWishlist();

  useEffect(() => {
    if (!isLoading) {
      setSelectedItems([
        ...(data?.items
          ?.filter((d: any) => d?.isPicked === true)
          ?.map((d: any) => d?.id) ?? []),
        ...(data?.collectionItems
          ?.filter((d: any) => d?.isPicked === true)
          ?.map((d: any) => d?.id) ?? []),
      ]);
    }
  }, [isLoading, isFetching]);

  useEffect(() => {
    async function fet() {
      await refetch();
    }
    fet();
  }, [openCart]);

  const update = async (value: any) => {
    try {
      await updateItem.mutateAsync(value);
    } catch (err) {
      errorModal(err);
    }
  };
  const updateCollection = async (value: any) => {
    try {
      await updateACollection.mutateAsync(value);
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

  const handleCollectionSelect = async (id: string) => {
    setOnLoad(id);
    if (selectedItems?.includes(id)) {
      await updateCollection({
        collectionItemId: id,
        isPicked: false,
      });
      // setSelectedItems(selectedItems?.filter((itemId: any) => itemId !== id));
    } else {
      await updateCollection({
        collectionItemId: id,
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

  const updateCollectionQuantity = async (id: string, newQuantity: number) => {
    setOnLoad(id);
    await updateCollection({
      collectionItemId: id,
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

  const removeFromCart = async (id: string) => {
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

  const removeCollectionFromCart = async (id: string) => {
    setOnLoad(id);
    try {
      await removeCollections.mutateAsync({
        collectionItems: [id],
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
            Your order qualifies for the free US delivery
          </div>
        </div>
        <div className='h-[500px] overflow-y-scroll scrollbar-hide'>
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
                  checked={
                    selectedItems?.length ===
                    data?.items?.length + data?.collectionItems?.length
                  }
                  onChange={handleSelectAll}
                />
              )}
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
                  isSelected={selectedItems?.includes(d?.id)}
                  onSelect={() => handleItemSelect(d?.id)}
                  remove={() => removeFromCart(d?.id)}
                  increaseQuantity={() =>
                    updateQuantity(d?.id, +d?.quantity + 1)
                  }
                  decreaseQuantity={() =>
                    updateQuantity(d?.id, +d?.quantity - 1)
                  }
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
          <div className='h-4'></div>
          <div className='flex flex-col gap-2'>
            {data?.collectionItems?.map((d: any) => {
              return (
                <CollectionCartItem
                  key={d?.id}
                  item={d}
                  isSelected={selectedItems?.includes(d?.id)}
                  onSelect={() => handleCollectionSelect(d?.id)}
                  remove={() => removeCollectionFromCart(d?.id)}
                  increaseQuantity={() =>
                    updateCollectionQuantity(d?.id, +d?.quantity + 1)
                  }
                  decreaseQuantity={() =>
                    updateCollectionQuantity(d?.id, +d?.quantity - 1)
                  }
                  changeQuantity={(newQuantity: number) =>
                    updateCollectionQuantity(d?.id, +newQuantity)
                  }
                  // addToWishList={() => addToWishList(d)}
                  // removeFromWishlist={() => removeFromWishlist(d)}
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
        </div>
      </div>
    );
};
