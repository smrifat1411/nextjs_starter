export const AUTH_KEYS = {
  IS_LOGGED_IN: ["isLoggedIn"] as const,
  ROLES: ["roles"] as const,
  AUTH_USER: ["authUser"] as const,
};

export const PRODUCT_KEYS = {
  COUNT: ["products", "count"],
  ALL: ["products", "all"],
  BY_ID: (id: string | number) => ["products", "byId", id],
  OPTIONS: ["products", "options"],
  VARIANT_OPTIONS: (id: string) => ["products", "variantOptions", id],
};

export const PROFILE_KEYS = {
  PROFILE: ["profile"] as const,
};
