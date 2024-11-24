import React, { useReducer } from "react";
import AuthContext from "@/contexts/AuthContext";
import { authReducer, initialAuthState } from "@/reducers/authReducer";
import { signin, signup, logout as apiLogout } from "@/apis/auth/authApi";

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  const login = async (values: { email: string; password: string }) => {
    dispatch({ type: "SET_LOADING", payload: true }); // Start loading
    try {
      const response = await signin(values);
      dispatch({ type: "LOGIN", payload: response.user });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false }); // End loading
    }
  };

  const register = async (values: { email: string; password: string }) => {
    dispatch({ type: "SET_LOADING", payload: true }); // Start loading
    try {
      const response = await signup(values);
      dispatch({ type: "LOGIN", payload: response.user });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false }); // End loading
    }
  };

  const logout = async () => {
    dispatch({ type: "SET_LOADING", payload: true }); // Start loading
    try {
      await apiLogout();
      dispatch({ type: "LOGOUT" });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false }); // End loading
    }
  };

  return (
    <AuthContext.Provider
      value={{ ...state, dispatch, login, logout, register }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
