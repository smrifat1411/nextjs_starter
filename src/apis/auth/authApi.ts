import AUTH_ENDPOINTS from "@/constants/endpoints/auth";
import apiClient from "../apiClient";

interface AuthCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

/**
 * Logs in the user with email and password.
 */
export const signin = async (
  values: AuthCredentials
): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>(
    AUTH_ENDPOINTS.SIGNIN,
    values
  );
  return response.data;
};

/**
 * Registers a new user with email and password.
 */
export const signup = async (
  values: AuthCredentials
): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>(
    AUTH_ENDPOINTS.SIGNUP,
    values
  );
  return response.data;
};

/**
 * Logs out the user.
 */
export const logout = async (): Promise<void> => {
  console.log("Logout logic: Clearing client-side state, no server request.");
};
