import { logout as apiLogout, signin, signup } from "@/apis/auth/authApi";
import AuthContext from "@/contexts/AuthContext";
import { authReducer, initialAuthState } from "@/reducers/authReducer";
import React, { useReducer } from "react";
import { toast } from "react-toastify";

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  /**
   * Logs in the user and updates the authentication state.
   * @param values - The user's login credentials.
   */
  const login = async (values: { email: string; password: string }) => {
    const response = await signin(values); // Errors handled in apiClient
    dispatch({ type: "LOGIN", payload: response.user });
    toast.success("Login successful!");
  };

  /**
   * Registers a new user and updates the authentication state.
   * @param values - The user's registration credentials.
   */
  const register = async (values: { email: string; password: string }) => {
    const response = await signup(values); // Errors handled in apiClient
    dispatch({ type: "LOGIN", payload: response.user });
    toast.success("Registration successful!");
  };

  /**
   * Logs out the user and clears the authentication state.
   */
  const handleLogout = async () => {
    await apiLogout(); // Errors handled in apiClient
    dispatch({ type: "LOGOUT" });
    toast.info("Logged out successfully!");
  };

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
        login,
        logout: handleLogout,
        register, // Added register method
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
