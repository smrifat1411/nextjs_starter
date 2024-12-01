import { AUTH_METHODS } from "@/constants/methods/authMethods";

// Define the different auth steps for better state management
export enum AuthSteps {
  EMAIL_PHONE_INPUT = "EMAIL_PHONE_INPUT", // Step 1: Input Email/Phone
  PASSWORD_INPUT = "PASSWORD_INPUT", // Step 2: Password input (for existing user)
  SIGNUP = "SIGNUP", // Step 3: Sign-Up Form
  OTP_VERIFICATION = "OTP_VERIFICATION", // Step 4: OTP Verification
  PASSWORD_CREATION = "PASSWORD_CREATION", // Step 5: Create/Reset Password
  LOGGED_IN = "LOGGED_IN", // Logged in state
  TOP_SCREEN = "TOP_SCREEN", // Final screen after successful sign-up
}

export interface AuthState {
  isAuthenticated: boolean;
  user: unknown;
  loading: boolean;
  authMethod: string;
  errors: unknown;
  userExists: boolean | null;
  currentStep: AuthSteps; // Track current step of authentication process
}

export type AuthAction =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "LOGIN"; payload: unknown }
  | { type: "LOGOUT" }
  | { type: "SET_AUTH_METHOD"; payload: string }
  | { type: "CHECK_USER_EXISTS"; payload: boolean }
  | { type: "SET_ERRORS"; payload: unknown }
  | { type: "SET_AUTH_STEP"; payload: AuthSteps }; // New action to set the current step

export const initialAuthState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  authMethod: AUTH_METHODS.EMAIL_AND_PASSWORD,
  errors: null,
  userExists: null,
  currentStep: AuthSteps.EMAIL_PHONE_INPUT, // Start at email/phone input step
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
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        currentStep: AuthSteps.EMAIL_PHONE_INPUT,
      };
    case "SET_AUTH_METHOD":
      return { ...state, authMethod: action.payload };
    case "CHECK_USER_EXISTS":
      return { ...state, userExists: action.payload };
    case "SET_ERRORS":
      return { ...state, errors: action.payload };
    case "SET_AUTH_STEP":
      return { ...state, currentStep: action.payload }; // Handle setting current auth step
    default:
      return state;
  }
};
