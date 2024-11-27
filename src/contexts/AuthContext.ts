import { createContext } from "react";
import { AuthState, AuthAction } from "@/reducers/authReducer";

export interface AuthContextType extends AuthState {
  // Extend AuthState directly
  dispatch: React.Dispatch<AuthAction>;
  login: (values: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  register: (values: { email: string; password: string }) => Promise<void>;
  checkUserExists: (values: {
    authMethod: string;
    loginIdentifier: string;
  }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export default AuthContext;
