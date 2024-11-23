import { fetchUserProfile, updateUserProfile } from "@/apis/profile/profileApi";
import { useQueryFactory } from "@/hooks/queries/useQueryFactory";
import { PROFILE_KEYS } from "@/utils/queryKeys";
import { useMutationFactory } from "./useMutationFactory";

/**
 * Fetches the user's profile using React Query.
 */
export const useProfileQuery = () =>
  useQueryFactory(PROFILE_KEYS.PROFILE, fetchUserProfile, {
    staleTime: 1000 * 60 * 10, // Override: Cache data for 10 minutes
    refetchOnWindowFocus: true, // Refetch when the window regains focus
  });

/**
 * Updates the user's profile using React Query.
 */
export const useUpdateProfileMutation = () =>
  useMutationFactory(updateUserProfile, {
    onSuccess: (data) => {
      console.log("Profile updated successfully:", data);
    },
    onError: (error) => {
      console.error("Profile update failed:", error);
    },
  });
