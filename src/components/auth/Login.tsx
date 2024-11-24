"use client";
import useAuth from "@/hooks/useAuth";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AppleLoginButton, GoogleLoginButton } from "./button";

interface LoginFormInputs {
  email: string;
  password: string; // If password is required
}

const Login: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(true); // Control visibility state

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const { login, isLoading } = useAuth(); // Use the custom useAuth hook to access the login function

  const modalVariants = {
    hidden: { opacity: 0, y: "100%" },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: "100%" }, // Reverse animation for closing
  };

  const transitionSettings = {
    type: "spring",
    stiffness: 300,
    damping: 25,
    // duration: 0.5,
  };

  const handleClose = () => {
    setIsVisible(false); // Trigger the exit animation
    setTimeout(onClose, 300); // Delay unmounting to allow animation to complete
  };

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      await login(data); // Call the login function from the context
      console.log("Login successful");
      handleClose(); // Trigger modal close
    } catch (error) {
      console.log("Login failed:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-70 z-50">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            key="login-modal"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalVariants}
            transition={transitionSettings}
            className="fixed inset-0 flex items-center justify-center z-20"
          >
            <motion.div
              className="bg-white w-full max-w-md rounded-2xl"
              variants={{
                hidden: { scale: 0.9, opacity: 0 },
                visible: { scale: 1, opacity: 1 },
                exit: { scale: 0.9, opacity: 0 },
              }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 30,
              }}
            >
              <div className="bg-white p-8 w-full max-w-md rounded-2xl">
                {/* Close button */}
                <div className="flex relative">
                  <button
                    className="text-gray-500 hover:text-gray-700 absolute left-0"
                    onClick={handleClose} // Close with delay
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="h-6 w-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                  <div className="text-center flex-grow">
                    <h4 className="text-md font-semibold mb-4">Login</h4>
                  </div>
                </div>

                <h2 className="text-lg font-bold mb-2">
                  Welcome to Production Props
                </h2>

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
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email.message}
                      </p>
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
                      disabled={isLoading} // Disable when loading
                      className={`bg-[#dc1a63] py-2 px-4 rounded-lg w-full text-white flex items-center justify-center ${
                        isLoading ? "bg-opacity-70 cursor-not-allowed" : ""
                      }`}
                    >
                      {isLoading ? (
                        <div className="flex space-x-2">
                          <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                          <span className="w-2 h-2 bg-white rounded-full animate-pulse delay-75"></span>
                          <span className="w-2 h-2 bg-white rounded-full animate-pulse delay-150"></span>
                        </div>
                      ) : (
                        "Continue"
                      )}
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
                </div>
                <Link
                  href={`${process.env.NEXT_PUBLIC_GOOGLE_LOGIN}`}
                  className="w-full"
                >
                  <AppleLoginButton />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Login;
