import { createContext } from "react";
import { AuthState, AuthAction } from "@/reducers/authReducer";

// Define the shape of the context value
export interface AuthContextType {
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
  login: (values: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  register: (values: { email: string; password: string }) => Promise<void>; // Add register method
}

const AuthContext = createContext<AuthContextType | null>(null);

export default AuthContext;
