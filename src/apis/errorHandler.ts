import { toast } from "react-toastify";

/**
 * Handles errors and triggers toast notifications for user feedback.
 * Ensures no error breaks the application.
 * @param error - The error object from Axios or other sources.
 */
export const handleApiError = (error: any): void => {
  // Default error message
  let message = "An unexpected error occurred. Please try again.";

  // Check if it's an Axios error with a response
  if (error.response) {
    const { status, data } = error.response;

    // Prefer `msg` property if available, otherwise fallback to default for status codes
    const apiMsg = data?.message;

    switch (status) {
      case 400:
        message = apiMsg || "Bad request. Please check your input.";
        break;
      case 401:
        message = apiMsg || "Unauthorized. Please log in.";
        break;
      case 403:
        message = apiMsg || "Access denied. You do not have permission.";
        break;
      case 404:
        message = apiMsg || "Resource not found.";
        break;
      case 500:
        message = apiMsg || "Internal server error. Please try again later.";
        break;
      default:
        message = apiMsg || data?.message || "An error occurred.";
    }
  } else if (error.request) {
    // Request was made but no response received
    message = "Network error. Please check your connection.";
  } else if (error.message) {
    // Other unexpected errors
    message = error.message;
  }

  // Show toast notification for the error
  toast.error(message);
};
