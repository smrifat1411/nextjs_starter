export type AuthState = {
  isAuthenticated: boolean;
  user: any | null;
  isLoading: boolean; // Add loading state
};

export const initialAuthState: AuthState = {
  isAuthenticated: false,
  user: null,
  isLoading: false,
};

export type AuthAction =
  | { type: "LOGIN"; payload: any }
  | { type: "LOGOUT" }
  | { type: "SET_LOADING"; payload: boolean }; // Add loading action

export const authReducer = (
  state: AuthState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        isLoading: false, // Ensure loading stops after login
      };
    case "LOGOUT":
      return {
        ...initialAuthState,
        isLoading: false, // Reset loading
      };
    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
