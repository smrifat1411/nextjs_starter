// components/OtpInput.tsx
import { AnimatePresence } from "framer-motion";
import { useState, ChangeEvent, KeyboardEvent } from "react";

interface OtpInputProps {
  length: number;
}

const OtpInput: React.FC<OtpInputProps> = ({ length }) => {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(""));

  // Handle change for each input
  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (value === "" || /^[0-9]$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Automatically focus the next input when a value is entered
      if (value && index < otp.length - 1) {
        document.getElementById(`otp-input-${index + 1}`)?.focus();
      }
    }
  };

  // Handle backspace to focus the previous input if needed
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-input-${index - 1}`)?.focus();
    }
  };

  return (
    <AnimatePresence>
      <div className="flex justify-center items-center space-x-6 mt-12 min-w-full">
        {otp.map((digit, index) => (
          <input
            key={index}
            id={`otp-input-${index}`}
            type="text"
            value={digit}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            maxLength={1}
            className="w-16 h-16 text-2xl text-center bg-white border-b-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ease-in-out shadow-sm focus:shadow-lg transform"
          />
        ))}
      </div>
    </AnimatePresence>
  );
};

export default OtpInput;
