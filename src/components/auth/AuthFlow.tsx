import useAuth from "@/hooks/useAuth";
import { AuthSteps } from "@/reducers/authReducer";
import { AnimatePresence, motion } from "framer-motion";
import React, { useMemo, useState } from "react";
import AuthBox from "./AuthBox";

// Define props for the AuthFlow component
interface AuthFlowProps {
  onClose: () => void; // Function that is called when the modal needs to be closed
}

const AuthFlow: React.FC<AuthFlowProps> = ({ onClose }) => {
  const { currentStep, loading } = useAuth();

  const [isVisible, setIsVisible] = useState(true); // State to control modal visibility

  const modalVariants = {
    hidden: { opacity: 0, y: "100%" },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: "100%" }, // Reverse animation for closing
  };

  const transitionSettings = {
    type: "spring",
    stiffness: 300,
    damping: 25,
  };

  const handleClose = () => {
    // Trigger exit animation
    setIsVisible(false); // Hide the modal content, but wait for animation to finish
    setTimeout(() => {
      onClose(); // Close the modal after animation completes
    }, 300); // Timeout duration matches the animation duration
  };

  const renderStep = useMemo(() => {
    switch (currentStep) {
      case AuthSteps.EMAIL_PHONE_INPUT:
        return <AuthBox />;
      // Handle other cases when needed
      default:
        return <p>No step selected</p>;
    }
  }, [currentStep]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="auth-modal"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={modalVariants}
          transition={transitionSettings}
          className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-70 z-50"
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
            <div className="bg-white p-8 relative w-full max-w-md rounded-2xl">
              {/* Close button */}

              <button
                className="text-gray-500 hover:text-gray-700 absolute left-2 top-1"
                onClick={handleClose} // Trigger close with animation
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
              {renderStep}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default React.memo(AuthFlow);
