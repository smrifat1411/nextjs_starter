import React, { useReducer, useCallback } from "react";
import AuthContext from "@/contexts/AuthContext";
import { authReducer, initialAuthState } from "@/reducers/authReducer";
import {
  signin,
  signup,
  logout as apiLogout,
  checkExistingUser,
} from "@/apis/auth/authApi";

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  const setAuthMethod = useCallback(
    (authMethod: string) => {
      dispatch({ type: "SET_AUTH_METHOD", payload: authMethod });
    },
    [dispatch]
  );

  const login = async (values: { email: string; password: string }) => {
    dispatch({ type: "SET_LOADING", payload: true }); // Start loading

    try {
      // Use authMethod from the state
      const response = await signin(values);
      dispatch({ type: "LOGIN", payload: response.user });
    } catch (error) {
      console.error("Login failed", error);
    } finally {
      dispatch({ type: "SET_LOADING", payload: false }); // End loading
    }
  };

  const register = async (values: { email: string; password: string }) => {
    dispatch({ type: "SET_LOADING", payload: true }); // Start loading

    try {
      // Use authMethod from the state
      const response = await signup(values);
      dispatch({ type: "LOGIN", payload: response.user });
    } catch (error) {
      console.error("Registration failed", error);
    } finally {
      dispatch({ type: "SET_LOADING", payload: false }); // End loading
    }
  };

  const logout = async () => {
    dispatch({ type: "SET_LOADING", payload: true }); // Start loading

    try {
      await apiLogout();
      dispatch({ type: "LOGOUT" });
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      dispatch({ type: "SET_LOADING", payload: false }); // End loading
    }
  };

  const checkUserExists = async (values: {
    authMethod?: string;
    loginIdentifier: string; // email or phone
  }) => {
    dispatch({ type: "SET_LOADING", payload: true }); // Optional: Set loading while checking user existence

    try {
      // Use authMethod from the state to pass the method for user existence check
      const method = values.authMethod || state.authMethod; // Fix: Correctly access `authMethod` from `state`
      const exists = await checkExistingUser({
        authMethod: method, // Pass authMethod to API call
        loginIdentifier: values.loginIdentifier, // email or phone
      });

      dispatch({ type: "CHECK_USER_EXISTS", payload: exists });
      return exists;
    } catch (error) {
      console.error("Error checking user existence", error);
      return false;
    } finally {
      dispatch({ type: "SET_LOADING", payload: false }); // End loading
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
