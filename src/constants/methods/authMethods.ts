export const AUTH_METHODS = {
  EMAIL_AND_PASSWORD: "EMAIL_AND_PASSWORD",
  MOBILE: "PHONE_AND_PASSWORD",
  GOOGLE: "GOOGLE",
  APPLE: "APPLE",
} as const;

export type AuthMethod = keyof typeof AUTH_METHODS;
