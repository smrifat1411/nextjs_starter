"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const Login: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(true); // Control visibility state

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
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Login;
