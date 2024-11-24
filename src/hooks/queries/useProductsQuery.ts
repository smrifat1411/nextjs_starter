import {
  getProductCount,
  getAllProducts,
  getProductById,
  getProductOptions,
  getProductVariantOptions,
  createProduct,
  updateProduct,
  deleteProduct,
  Product,
} from "@/apis/products/productsApi";
import { useQueryFactory } from "@/hooks/queries/useQueryFactory";
import { useMutationFactory } from "@/hooks/queries/useMutationFactory";
import { PRODUCT_KEYS } from "@/utils/queryKeys";
import { useInfiniteQuery } from "@tanstack/react-query";

/**
 * Fetches the total count of products.
 */
export const useProductCountQuery = (queryParams = {}) =>
  useQueryFactory(PRODUCT_KEYS.COUNT, () => getProductCount(queryParams), {
    staleTime: 1000 * 60 * 10, // Cache for 10 minutes
  });

/**
 * Fetches all products with optional query parameters.
 */
export const useAllProductsQuery = (params: { limit: number }) => {
  return useInfiniteQuery({
    queryKey: ["products", params],
    queryFn: async ({ pageParam = 1 }) =>
      getAllProducts({ ...params, page: pageParam }),
    getNextPageParam: (lastPage, allPages) => {
      const maxPages = Math.ceil(lastPage.count / params.limit);
      return allPages.length < maxPages ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1, // Add initialPageParam to define the starting page
  });
};
/**
 * Fetches a specific product by ID.
 */
export const useProductByIdQuery = (id: string | number, queryParams = {}) =>
  useQueryFactory(
    PRODUCT_KEYS.BY_ID(id),
    () => getProductById(id, queryParams),
    {
      enabled: !!id, // Only fetch if ID is provided
      staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    }
  );

/**
 * Fetches product options.
 */
export const useProductOptionsQuery = () =>
  useQueryFactory(PRODUCT_KEYS.OPTIONS, getProductOptions, {
    staleTime: 1000 * 60 * 10, // Cache for 10 minutes
  });

/**
 * Fetches variant options for a specific product by product ID.
 */
export const useProductVariantOptionsQuery = (productId: string) =>
  useQueryFactory(
    PRODUCT_KEYS.VARIANT_OPTIONS(productId),
    () => getProductVariantOptions(productId),
    {
      enabled: !!productId, // Only fetch if productId is provided
      staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    }
  );

/**
 * Creates a new product.
 */
export const useCreateProductMutation = () => useMutationFactory(createProduct);

/**
 * Updates an existing product by ID.
 */
export const useUpdateProductMutation = () =>
  useMutationFactory<Product, { id: string | number; data: Partial<Product> }>(
    ({ id, data }) => updateProduct(id, data)
  );

/**
 * Deletes a product by ID.
 */
export const useDeleteProductMutation = () =>
  useMutationFactory((id: string | number) => deleteProduct(id));
