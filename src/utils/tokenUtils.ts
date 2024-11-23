import { AuthKeys } from "@/constants/keys/authKeys";

/**
 * Set authentication tokens in localStorage.
 * @param accessToken - The access token to store.
 * @param refreshToken - The refresh token to store.
 */
export const setToken = (accessToken: string, refreshToken: string): void => {
  localStorage.setItem(AuthKeys.ACCESS_TOKEN, accessToken);
  localStorage.setItem(AuthKeys.REFRESH_TOKEN, refreshToken);
};

/**
 * Get authentication tokens from localStorage.
 * @returns An object containing accessToken and refreshToken.
 */
export const getToken = (): {
  accessToken: string | null;
  refreshToken: string | null;
} => ({
  accessToken: localStorage.getItem(AuthKeys.ACCESS_TOKEN),
  refreshToken: localStorage.getItem(AuthKeys.REFRESH_TOKEN),
});

/**
 * Remove authentication tokens from localStorage.
 */
export const removeToken = (): void => {
  localStorage.removeItem(AuthKeys.ACCESS_TOKEN);
  localStorage.removeItem(AuthKeys.REFRESH_TOKEN);
};
