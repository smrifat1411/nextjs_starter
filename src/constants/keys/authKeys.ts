// src/constants/authKeys.ts

export const AuthKeys = {
  ACCESS_TOKEN: "access_token",
  REFRESH_TOKEN: "refresh_token",
  SESSION_ID: "session_id", // Optional: Add only if needed
} as const;

export type AuthKey = keyof typeof AuthKeys;
