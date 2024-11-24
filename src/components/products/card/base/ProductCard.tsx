'use client';

// import { AddToWishlist } from '@/components/wishlist';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface ProductCardProps {
  product: any;
}

export function ProductCard({ product }: ProductCardProps) {
  const [currentVariantIndex, setCurrentVariantIndex] = useState(0);

  const router = useRouter();

  const onProductClick = () => {
    router.push(`/product/${product?.id}`);
  };

  const handlePrevArrowClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (currentVariantIndex > 0) {
      setCurrentVariantIndex(currentVariantIndex - 1);
    }
  };

  const handleNextArrowClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (currentVariantIndex < product?.variants?.length - 1) {
      setCurrentVariantIndex(currentVariantIndex + 1);
    }
  };

  const showPrevArrow = currentVariantIndex > 0;
  const showNextArrow = currentVariantIndex < product?.variants?.length - 1;

  return (
    <>
      <div className='flex max-w-full flex-col !font-proxima md:max-w-full'>
        <div className='group relative h-0 w-full cursor-pointer pb-[75%]'>
          <div className='absolute inset-0'>
            {product?.variants?.length > 1 && (
              <>
                {showPrevArrow && (
                  <LeftOutlined
                    className='absolute left-2 top-1/2 z-10 -translate-y-1/2 transform cursor-pointer rounded-full border border-gray-200 bg-white p-2 text-xs text-gray-200 opacity-0 transition-opacity duration-300 hover:scale-105 hover:text-gray-500 hover:shadow-lg group-hover:opacity-100'
                    onClick={handlePrevArrowClick}
                  />
                )}
                {showNextArrow && (
                  <RightOutlined
                    className='absolute right-2 top-1/2 z-10 -translate-y-1/2 transform cursor-pointer rounded-full border border-gray-200 bg-white p-2 text-xs text-gray-200 opacity-0 transition-opacity duration-300 hover:scale-105 hover:text-gray-500 hover:shadow-lg group-hover:opacity-100'
                    onClick={handleNextArrowClick}
                  />
                )}
              </>
            )}
            <Image
              onClick={onProductClick}
              src={
                product?.variants?.at(currentVariantIndex)?.image ??
                product?.images?.at(0) ??
                '/pictures/placeholder.png'
              }
              alt={product?.name || 'Product Image'}
              layout='fill'
              objectFit='cover'
              className='rounded-md border border-gray-200 bg-gray-100'
            />
            <div className='absolute left-2 top-2 rounded-full bg-gray-400 bg-opacity-80 px-2 py-0.5 text-[0.5rem] text-white md:text-[0.7rem]'>
              {product?.availableForSelling && product?.availableForRenting
                ? 'To Buy & Rent'
                : product?.availableForRenting
                  ? 'Rent Only'
                  : 'Buy Only'}
            </div>
            {/* <AddToWishlist
              component={
                <div className='absolute right-2 top-2 flex h-5 w-fit cursor-pointer items-center gap-1 rounded-full bg-gray-400 bg-opacity-80 p-1 text-[0.5rem] text-white group-hover:bg-[#C7675E] md:text-[0.7rem]'>
                  <span className='hidden pl-1 group-hover:block'>
                    Wish list
                  </span>
                  <Image
                    className='h-full w-fit'
                    src={'/icons/HeartWhite.svg'}
                    alt={'fav'}
                    width={100}
                    height={100}
                  />
                </div>
              }
              product={product}
            /> */}
          </div>
        </div>
        <div
          onClick={onProductClick}
          className='flex cursor-pointer flex-col overflow-hidden pt-2'
        >
          <div className='flex justify-between'>
            <div className='text-sm font-semibold'>{product?.name}</div>
            <div className='px-0.5 text-xs font-semibold tracking-tighter text-red-800'>
              {+product?.rating?.toFixed(2)}
            </div>
          </div>
          <div className='text-xs font-medium text-gray-500'>
            {product?.variants?.length} variants |{' '}
            <span className='truncate'>{product?.summary}</span>
          </div>
          <div className='flex items-center gap-2'>
            <div
              className={`${product?.onSell == true ? 'text-sm font-extralight text-gray-600 line-through' : 'text-sm font-semibold'}`}
            >
              ${product?.sellPrice}
            </div>
            {product?.onSell == true && (
              <span className='font-bold'> ${product?.price}</span>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
