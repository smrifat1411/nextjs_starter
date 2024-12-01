import {
  logout as apiLogout,
  checkExistingUser,
  signin,
  signup,
} from "@/apis/auth/authApi";
import AuthContext from "@/contexts/AuthContext";
import {
  authReducer,
  initialAuthState,
  AuthSteps,
} from "@/reducers/authReducer"; // Import `AuthSteps` for flow control
import React, { useCallback, useReducer } from "react";

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  // Set authentication method (email/phone or another method)
  const setAuthMethod = useCallback(
    (authMethod: string) => {
      dispatch({ type: "SET_AUTH_METHOD", payload: authMethod });
    },
    [dispatch]
  );

  // Login with email and password
  const login = async (values: { email: string; password: string }) => {
    dispatch({ type: "SET_LOADING", payload: true });

    try {
      const response = await signin(values); // Call the sign-in API
      dispatch({ type: "LOGIN", payload: response.user });
      dispatch({ type: "SET_AUTH_STEP", payload: AuthSteps.LOGGED_IN }); // Move to logged-in step
    } catch (error) {
      console.error("Login failed", error);
      dispatch({ type: "SET_ERRORS", payload: error }); // Optionally handle errors
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  // Register new user (sign-up)
  const register = async (values: { email: string; password: string }) => {
    dispatch({ type: "SET_LOADING", payload: true });

    try {
      const response = await signup(values); // Call the sign-up API
      dispatch({ type: "LOGIN", payload: response.user });
      dispatch({ type: "SET_AUTH_STEP", payload: AuthSteps.OTP_VERIFICATION }); // Go to OTP verification step
    } catch (error) {
      console.error("Registration failed", error);
      dispatch({ type: "SET_ERRORS", payload: error });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  // Log out the user
  const logout = async () => {
    dispatch({ type: "SET_LOADING", payload: true });

    try {
      await apiLogout(); // Call the logout API
      dispatch({ type: "LOGOUT" });
      dispatch({ type: "SET_AUTH_STEP", payload: AuthSteps.EMAIL_PHONE_INPUT }); // Reset to the start of the flow
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  // Check if the user exists based on email or phone
  const checkUserExists = async (values: {
    authMethod?: string;
    loginIdentifier: string; // email or phone
  }) => {
    dispatch({ type: "SET_LOADING", payload: true });

    try {
      const method = values.authMethod || state.authMethod; // Fallback to current authMethod
      const exists = await checkExistingUser({
        authMethod: method,
        loginIdentifier: values.loginIdentifier,
      });

      dispatch({ type: "CHECK_USER_EXISTS", payload: exists });

      // Move to the next step based on user existence
      if (exists) {
        dispatch({ type: "SET_AUTH_STEP", payload: AuthSteps.PASSWORD_INPUT }); // If user exists, go to password input
      } else {
        dispatch({ type: "SET_AUTH_STEP", payload: AuthSteps.SIGNUP }); // If user doesn't exist, go to sign-up
      }

      return exists;
    } catch (error) {
      console.error("Error checking user existence", error);
      dispatch({ type: "SET_ERRORS", payload: error });
      return false;
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  // Step transition for OTP verification
  const verifyOTP = async (otp: string) => {
    dispatch({ type: "SET_LOADING", payload: true });

    try {
      // Call OTP verification API (to be implemented)
      // If OTP is verified, proceed to the next step (password creation)
      dispatch({ type: "SET_AUTH_STEP", payload: AuthSteps.PASSWORD_CREATION });
    } catch (error) {
      console.error("OTP verification failed", error);
      dispatch({ type: "SET_ERRORS", payload: error });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        dispatch,
        setAuthMethod,
        login,
        logout,
        register,
        checkUserExists,
        verifyOTP,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
