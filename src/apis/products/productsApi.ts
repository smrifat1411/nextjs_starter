import PRODUCT_ENDPOINTS from "@/constants/endpoints/products";
import apiClient from "../apiClient";

interface ProductQueryParams {
  [key: string]: string | number | boolean | undefined;
}

export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  variants?: Array<{ id: string; name: string }>;
}

export interface ProductOption {
  id: string;
  name: string;
}

/**
 * Fetches the total count of products with optional query parameters.
 */
export const getProductCount = async (
  queryParams: ProductQueryParams = {}
): Promise<number> => {
  const response = await apiClient.get<number>(PRODUCT_ENDPOINTS.COUNT, {
    params: queryParams,
  });

  return response.data;
};

/**
 * Fetches all products with optional query parameters.
 */
export const getAllProducts = async (
  queryParams: ProductQueryParams = {}
): Promise<Product[]> => {
  const response = await apiClient.get<Product[]>(PRODUCT_ENDPOINTS.ALL, {
    params: queryParams,
  });

  return response.data;
};

/**
 * Fetches product options.
 */
export const getProductOptions = async (): Promise<ProductOption[]> => {
  const response = await apiClient.get<ProductOption[]>(
    PRODUCT_ENDPOINTS.OPTIONS
  );

  return response.data;
};

/**
 * Fetches variant options for a specific product by product ID.
 */
export const getProductVariantOptions = async (
  productId: string
): Promise<ProductOption[] | null> => {
  if (!productId) {
    return null;
  }

  const response = await apiClient.get<ProductOption[]>(
    `${PRODUCT_ENDPOINTS.VARIANT_OPTIONS}/${productId}`
  );

  return response.data;
};

/**
 * Fetches details of a specific product by ID with optional query parameters.
 */
export const getProductById = async (
  id: string | number,
  queryParams: ProductQueryParams = {}
): Promise<Product | null> => {
  if (!id) {
    return null;
  }

  const response = await apiClient.get<Product>(
    `${PRODUCT_ENDPOINTS.BY_ID}/${id}`,
    { params: queryParams }
  );

  return response.data;
};

/**
 * Creates a new product.
 */
export const createProduct = async (
  productData: Partial<Product>
): Promise<Product> => {
  const response = await apiClient.post<Product>(
    PRODUCT_ENDPOINTS.CREATE,
    productData
  );

  return response.data;
};

/**
 * Updates an existing product by ID.
 */
export const updateProduct = async (
  id: string | number,
  productData: Partial<Product>
): Promise<Product> => {
  const response = await apiClient.patch<Product>(
    `${PRODUCT_ENDPOINTS.UPDATE}/${id}`,
    productData
  );

  return response.data;
};

/**
 * Deletes a product by ID.
 */
export const deleteProduct = async (id: string | number): Promise<void> => {
  await apiClient.delete(`${PRODUCT_ENDPOINTS.DELETE}/${id}`);
};
