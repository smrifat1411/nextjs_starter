import { AUTH_METHODS } from "@/constants/methods/authMethods";

export interface AuthState {
  isAuthenticated: boolean;
  user: unknown;
  loading: boolean;
  authMethod: string;
  errors: unknown;
  userExists: boolean | null; // Add userExists to track the existence of a user
}

export type AuthAction =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "LOGIN"; payload: unknown }
  | { type: "LOGOUT" }
  | { type: "SET_AUTH_METHOD"; payload: string }
  | { type: "CHECK_USER_EXISTS"; payload: boolean }
  | { type: "SET_ERRORS"; payload: unknown };

export const initialAuthState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  authMethod: AUTH_METHODS.EMAIL_AND_PASSWORD,
  errors: null,
  userExists: null, // Initialize as null or false, based on how you want to handle the state
};

export const authReducer = (
  state: AuthState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "LOGIN":
      return { ...state, isAuthenticated: true, user: action.payload };
    case "LOGOUT":
      return { ...state, isAuthenticated: false, user: null };
    case "SET_AUTH_METHOD":
      return { ...state, authMethod: action.payload };
    case "CHECK_USER_EXISTS":
      return { ...state, userExists: action.payload }; // Now it updates the userExists correctly
    case "SET_ERRORS":
      return { ...state, errors: action.payload };
    default:
      return state;
  }
};
