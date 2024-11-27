import { createContext } from "react";
import { AuthState, AuthAction } from "@/reducers/authReducer"; // Make sure this import is correct

// Define the type for AuthContext
export interface AuthContextType extends AuthState {
  dispatch: React.Dispatch<AuthAction>;
  setAuthMethod: (authMethod: string) => void;
  login: (values: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  register: (values: { email: string; password: string }) => Promise<void>;
  checkUserExists: (values: {
    authMethod?: string;
    loginIdentifier: string;
  }) => Promise<boolean>;
}

// Create the context
const AuthContext = createContext<AuthContextType | null>(null); // Correctly initialize with null

export default AuthContext;
