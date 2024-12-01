import React from "react";
import { AppleLoginButton, GoogleLoginButton } from "./button";
import useAuth from "@/hooks/useAuth";
import { SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";

interface LoginFormInputs {
  email: string;
  password: string; // If password is required
}

const AuthBox = () => {
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      await login(data); // Call the login function from the context
      console.log("Login successful");
    } catch (error) {
      console.log("Login failed:", error);
    }
  };
  return (
    <div className="">
      {/* Form with react-hook-form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email Input */}
        <div>
          <input
            {...register("email", {
              required: "Please enter your email!",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Please enter a valid email!",
              },
            })}
            placeholder="Email"
            className="py-2 border-black border-[2px] w-full rounded-lg focus:outline-none focus:border-dca163 text-[14px]"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password Input (optional) */}
        <div>
          <input
            {...register("password", {
              required: "Please enter your password!",
            })}
            type="password"
            placeholder="Password"
            className="py-2 border-black border-[2px] w-full rounded-lg focus:outline-none focus:border-dca163 text-[14px]"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className={`bg-[#dc1a63] py-2 px-4 rounded-lg w-full text-white flex items-center justify-center`}
          >
            {"Continue"}
          </button>
        </div>
      </form>

      {/* Divider */}
      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white px-3 text-gray-500">or</span>
        </div>
      </div>

      {/* Social Login Buttons */}
      <div className="py-2 rounded-lg w-full text-white">
        <Link
          href={`${process.env.NEXT_PUBLIC_GOOGLE_LOGIN}`}
          className="w-full"
        >
          <GoogleLoginButton />
        </Link>

        <Link
          href={`${process.env.NEXT_PUBLIC_GOOGLE_LOGIN}`}
          className="w-full"
        >
          <AppleLoginButton />
        </Link>
      </div>
    </div>
  );
};

export default AuthBox;
