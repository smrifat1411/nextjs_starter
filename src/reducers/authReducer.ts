// In authReducer.ts

export type AuthState = {
  isAuthenticated: boolean;
  user: unknown | null;
  isLoading: boolean; // Add loading state
  userExists: boolean | null; // Track if user exists
};

export const initialAuthState: AuthState = {
  isAuthenticated: false,
  user: null,
  isLoading: false,
  userExists: null, // Initial state for user existence check
};

export type AuthAction =
  | { type: "LOGIN"; payload: any }
  | { type: "LOGOUT" }
  | { type: "SET_USER"; payload: any }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "CHECK_USER_EXISTS"; payload: boolean | null }; // New action type

export const authReducer = (
  state: AuthState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        isLoading: false,
      };
    case "LOGOUT":
      return {
        ...initialAuthState,
        isLoading: false, // Reset loading
      };
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
        isLoading: false,
      };
    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };
    case "CHECK_USER_EXISTS":
      return {
        ...state,
        userExists: action.payload, // Set the result of user existence check
        isLoading: false,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
