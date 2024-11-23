import apiClient from "@/api/apiClient";
import PROFILE_ENDPOINTS from "@/constants/endpoints/auth";

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  address?: string;
  phone?: string;
  preferences?: {
    theme?: string;
    notifications?: boolean;
  };
}

/**
 * Fetch the current user's profile.
 */
export const fetchUserProfile = async (): Promise<UserProfile> => {
  const response = await apiClient.get<UserProfile>(AUTH_ENDPOINTS.GET_PROFILE);
  return response.data;
};

/**
 * Update the current user's profile.
 * @param profileData - Partial data to update in the user's profile.
 */
export const updateUserProfile = async (
  profileData: Partial<UserProfile>
): Promise<UserProfile> => {
  const response = await apiClient.put<UserProfile>(
    AUTH_ENDPOINTS.UPDATE_PROFILE,
    profileData
  );
  return response.data;
};
