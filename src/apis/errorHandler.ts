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
    const { status } = error.response;

    switch (status) {
      case 400:
        message = "Bad request. Please check your input.";
        break;
      case 401:
        message = "Unauthorized. Please log in.";
        break;
      case 403:
        message = "Access denied. You do not have permission.";
        break;
      case 404:
        message = "Resource not found.";
        break;
      case 500:
        message = "Internal server error. Please try again later.";
        break;
      default:
        message = error.response.data?.message || "An error occurred.";
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
