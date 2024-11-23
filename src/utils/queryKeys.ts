export const AUTH_KEYS = {
  IS_LOGGED_IN: ["isLoggedIn"] as const,
  ROLES: ["roles"] as const,
  AUTH_USER: ["authUser"] as const,
};

export const PRODUCT_KEYS = {
  ALL_PRODUCTS: ["allProducts"] as const,
  PRODUCT_DETAILS: (id: string) => ["productDetails", id] as const,
};

export const PROFILE_KEYS = {
  PROFILE: ["profile"] as const,
};
