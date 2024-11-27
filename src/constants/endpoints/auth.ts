const AUTH_ENDPOINTS = {
  CHECK_EMAIL: "/auth/local/check-email",
  SIGNIN: "/auth/local/login",
  SIGNUP: "/auth/local/register",
  VERIFY_EMAIL: "/auth/local/verify-email",
  IS_LOGGEDIN: "/auth/local/isloggedin",
  GET_ROLE: "/auth/local/role",
  LOGOUT: "/auth/local/logout",
  FORGOT_PASSWORD: "/auth/local/forgot-password",
  RECEIVE_OTP: "/auth/local/receive-otp",
  SET_PASSWORD: "/auth/local/otp-newpassword",
  REFRESH_TOKEN: "/auth/local/refresh-token",
  CHECK_EXISTING_USER: "/auth/v2/local/check-existing-user",
};

export default AUTH_ENDPOINTS;
