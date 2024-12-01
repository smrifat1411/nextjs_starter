import useAuth from "@/hooks/useAuth";
import { AuthSteps } from "@/reducers/authReducer";
import { AnimatePresence } from "framer-motion";
import React from "react";

const Signup: React.FC = () => {
  // Define animation variants

  const { dispatch } = useAuth();

  return (
    <AnimatePresence>
      <div className="bg-white p-8 w-full max-w-md rounded-2xl">
        {/* First Name Field */}
        <div className="relative">
          <input
            type="text"
            id="firstName"
            name="firstName"
            placeholder="First Name"
            className="px-2 w-full border border-gray-300 rounded-t-lg focus:outline-none focus:border-dca163 text-[12px]"
          />
        </div>

        {/* Last Name Field */}
        <div className="mb-4 relative">
          <input
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Last Name"
            className="px-2 w-full border border-gray-300 rounded-b-lg border-t-0 focus:outline-none focus:border-dca163 text-[12px]"
          />
        </div>

        {/* Email input field */}
        <div className="relative">
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            disabled
            className="mt-1 px-2 border-gray-300 w-full border rounded-lg focus:outline-none focus:border-dca163 text-[14px]"
          />
        </div>
        <h6 className="text-[#0000ff] text-[10px] py-2 pl-2">
          We&apos;ll send email confirmation.
        </h6>

        {/* Password Field */}
        <div className="mb-4 relative">
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            className="mt-1 px-2 border-gray-300 w-full border rounded-lg focus:outline-none focus:border-dca163 text-[12px]"
          />
          <div className="absolute top-3 right-2">
            <button
              type="button"
              className="text-gray-600 text-[12px] font-medium focus:outline-none underline"
            >
              Show
            </button>
          </div>
        </div>

        {/* Agreement Text */}
        <div className="mb-4 text-[10px] text-gray-600">
          By selecting
          <a href="#" className="font-semibold text-black">
            Agree and Continue
          </a>
          , I agree to Production Prop
          <a href="#" className="text-[#0000ff] underline">
            Terms of Service
          </a>
          ,
          <a href="#" className="text-[#0000ff] underline">
            Payments Terms of Service
          </a>
          , and
          <a href="#" className="text-[#0000ff] underline">
            Nondiscrimination Policy
          </a>
          and acknowledge the
          <a href="#" className="text-[#0000ff] underline">
            Privacy Policy
          </a>
          .
        </div>

        {/* Agree and Continue button */}
        <button
          className="bg-[#dc1a63] py-2 px-4 rounded-lg mb-6 w-full text-white text-[12px]"
          onClick={() =>
            dispatch({
              type: "SET_AUTH_STEP",
              payload: AuthSteps.OTP_VERIFICATION,
            })
          }
        >
          Agree and continue
        </button>
      </div>
    </AnimatePresence>
  );
};

export default Signup;
