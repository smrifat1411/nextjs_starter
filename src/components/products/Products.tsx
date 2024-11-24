"use client";

import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useAllProductsQuery } from "@/hooks/queries/useProductsQuery";
import { ProductCard, ProductCardSkeleton } from "./card/base";
import { EmptyMark } from "../common/Empty";

const ProductPage = () => {
  const { data, isLoading, fetchNextPage, hasNextPage } = useAllProductsQuery({
    limit: 16,
  });

  const products = data?.pages.flatMap((page) => page.data) || [];
  const totalCount = data?.pages[0]?.count || 0;

  return (
    <>
      <div className="m-4 text-gray-400">
        Displaying {products.length} out of {totalCount} Products
      </div>

      <div className="m-4 grid grid-cols-2 gap-4 md:mx-12 md:my-4 md:grid-cols-4 md:gap-8">
        {isLoading &&
          [1, 2, 3, 4].map((key: number) => <ProductCardSkeleton key={key} />)}
      </div>

      <InfiniteScroll
        className="scrollbar-hide"
        dataLength={products.length}
        next={fetchNextPage}
        hasMore={hasNextPage || false}
        loader={
          <div className="m-4 grid grid-cols-2 gap-4 md:mx-12 md:my-4 md:grid-cols-4 md:gap-8">
            {[1, 2, 3, 4].map((key: number) => (
              <ProductCardSkeleton key={key} />
            ))}
          </div>
        }
        endMessage={
          <p className="w-full text-center text-gray-400">
            No more products to show
          </p>
        }
      >
        <div className="m-4 grid grid-cols-2 gap-4 md:mx-12 md:my-4 md:grid-cols-4 md:gap-8">
          {products.map((product: any, index: number) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      </InfiniteScroll>

      {!isLoading && products.length === 0 && (
        <EmptyMark message={"No Products Available!"} />
      )}
    </>
  );
};

export default ProductPage;
