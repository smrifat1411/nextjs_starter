import AUTH_ENDPOINTS from "@/constants/endpoints/auth";
import { removeToken, setToken } from "@/utils/tokenUtils";
import apiClient from "../apiClient";

interface AuthCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string; // Assuming this is the access token
  refreshToken: string; // Assuming the API also provides a refresh token
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

  const { accessToken, refreshToken } = response.data;

  // Store tokens after successful login
  setToken(accessToken, refreshToken);

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

  const { accessToken, refreshToken } = response.data;

  // Store tokens after successful signup
  setToken(accessToken, refreshToken);

  return response.data;
};

/**
 * Logs out the user.
 */
export const logout = async (): Promise<void> => {
  // Remove tokens from client-side storage
  removeToken();

  // Optionally, you can add server-side logout logic if required
  console.log("Logout: Tokens cleared from client-side.");
};

/**
 * Checks if a user exists based on the auth method and identifier.
 */
export const checkExistingUser = async (values: {
  authMethod: string;
  loginIdentifier: string;
}): Promise<boolean> => {
  const response = await apiClient.post<{ exists: boolean }>(
    AUTH_ENDPOINTS.CHECK_EXISTING_USER,
    values
  );

  return response.data.exists; // Backend should return `{ exists: true/false }`
};
