/* eslint-disable @typescript-eslint/no-explicit-any */
export type AuthState = {
  isAuthenticated: boolean;
  user: any | null;
};

export const initialAuthState: AuthState = {
  isAuthenticated: false,
  user: null,
};

export type AuthAction = { type: "LOGIN"; payload: any } | { type: "LOGOUT" };

export const authReducer = (
  state: AuthState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case "LOGIN":
      return {
        isAuthenticated: true,
        user: action.payload,
      };
    case "LOGOUT":
      return initialAuthState;
    default:
      return state;
  }
};
