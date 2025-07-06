import axios from "axios";
import { useState } from "react";
import GradientText from "../animation/shinytext";
import toast from "react-hot-toast";
import { useEffect } from "react";
const API_URL = import.meta.env.VITE_BACKEND_HOST_URL;

export const Form = ({ formData, onInputChange, onSubmit, onFinalSubmit }) => {
  const [errors, setErrors] = useState({});
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(0);
   // 60 seconds = 1 minute
  useEffect(() => {
    if (secondsLeft === 0) return; // No timer running

    const interval = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [secondsLeft]);
  // Handle form validation and OTP sending
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validation
    if (!formData.name.trim()) {
      newErrors.name = "⚠️ Please enter your full name.";
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      newErrors.email = "⚠️ Please enter a valid email address.";
    }
    if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "⚠️ Phone number must be exactly 10 digits.";
    }
    const quantity = Number(formData.quantity);
    if (isNaN(quantity) || quantity < 1 || quantity > 5) {
      newErrors.quantity = "⚠️ Quantity must be between 1 and 5.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Show toast on submit click
      toast.loading("Sending OTP...", { id: "otpSend" });
      try {
        const response = await axios.post(
        `${API_URL}/api/otp/send`,
          { email: formData.email }
        );
        toast.success(response.data.message || "OTP sent to your email.", {
          id: "otpSend",
        });
        setShowOtpInput(true);
        setOtpSent(true);
        setSecondsLeft(60); // 60 seconds = 1 minute
        onSubmit(e);
      } catch (error) {
        toast.error("Failed to send OTP. Please try again.", { id: "otpSend" });
        console.error(error);
      }
    } else {
      // If validation errors, show an error toast
      toast.error("Please fix the errors in the form.");
    }
  };

  // Handle OTP verification
  const handleVerifyOtp = async () => {
    toast.loading("Verifying OTP...", { id: "otpVerify" });
    try {
      const response = await axios.post(
        `${API_URL}/api/otp/verify`,
        { email: formData.email, otp }
      );
      toast.success(response.data.message || "OTP verified successfully.", {
        id: "otpVerify",
      });

      // Proceed with the actual form submission
      onFinalSubmit();

      setShowOtpInput(false);
      setOtp(""); // clear OTP after successful submission
      setOtpSent(false);
    } catch (error) {
      toast.error("Invalid OTP. Please try again.", { id: "otpVerify" });
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if ((name === "phone" || name === "quantity") && value < 0) return;
    if (otpSent) {
      setOtpSent(false);
      setShowOtpInput(false);
      setOtp("");
    }

    onInputChange(e);
  };

  return (
    <div className="flex justify-center items-center min-h-screen w-screen bg-[#F6F0F0] p-4">
      <div className="bg-white p-5 rounded-xl shadow-lg w-full max-w-md">
        <GradientText
          colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
          animationSpeed={3}
          showBorder={false}
          className="custom-class text-3xl font-bold mb-5 text-center"
        >
          Fill Your Order Details
        </GradientText>

        <form className="space-y-4" onSubmit={handleSubmit} noValidate>
          {/* Full Name */}
          <div className="flex flex-col">
            <label htmlFor="name" className="text-gray-700 font-medium">
              Full Name
            </label>
            <input
              value={formData.name}
              onChange={handleInputChange}
              name="name"
              type="text"
              id="name"
              placeholder="Enter your name"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.name && (
              <p className="text-red-600 text-xs">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label htmlFor="email" className="text-gray-700 font-medium">
              Email Address
            </label>
            <input
              value={formData.email}
              onChange={handleInputChange}
              type="email"
              id="email"
              name="email"
              placeholder="Enter a valid email"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="text-red-600 text-xs">{errors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div className="flex flex-col">
            <label htmlFor="phone" className="text-gray-700 font-medium">
              Phone Number
            </label>
            <input
              value={formData.phone}
              onChange={handleInputChange}
              name="phone"
              type="number"
              id="phone"
              placeholder="10-digit phone number"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.phone && (
              <p className="text-red-600 text-xs">{errors.phone}</p>
            )}
          </div>

          {/* Branch */}
          <div className="flex flex-col">
            <label htmlFor="branch" className="text-gray-700 font-medium">
              Choose Branch
            </label>
            <select
              name="branch"
              value={formData.branch}
              onChange={handleInputChange}
              id="branch"
              className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-- Select --</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Electronic Communication">
                Electronic Communication
              </option>
              <option value="Information Technology">
                Information Technology
              </option>
              <option value="Mechanical Engineering">
                Mechanical Engineering
              </option>
              <option value="Civil Engineering">Civil Engineering</option>
            </select>
          </div>

          {/* Year */}
          <div className="flex flex-col">
            <label htmlFor="year" className="text-gray-700 font-medium">
              Choose Year
            </label>
            <select
              name="year"
              value={formData.year}
              onChange={handleInputChange}
              id="year"
              className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-- Select --</option>
              <option value="Freshman / First Year">
                Freshman / First Year
              </option>
              <option value="Sophomore / Second Year">
                Sophomore / Second Year
              </option>
              <option value="Junior / Third Year">Junior / Third Year</option>
              <option value="Senior / Fourth Year">Senior / Fourth Year</option>
            </select>
          </div>

          {/* Quantity */}
          <div className="flex flex-col items-center">
            <label htmlFor="quantity" className="text-gray-700 font-medium">
              Quantity of File
            </label>
            <div className="flex items-center space-x-3 mt-2">
              <button
                type="button"
                onClick={() => {
                  const qty = Math.max(1, Number(formData.quantity) - 1);
                  onInputChange({ target: { name: "quantity", value: qty } });
                }}
                className="px-3 py-1 bg-red-400 rounded text-white text-lg"
              >
                -
              </button>
              <span className="px-4 py-2 border border-gray-300 rounded w-12 text-center">
                {formData.quantity}
              </span>
              <button
                type="button"
                onClick={() => {
                  const qty = Math.min(5, Number(formData.quantity) + 1);
                  onInputChange({ target: { name: "quantity", value: qty } });
                }}
                className="px-3 py-1 bg-green-400 rounded text-white text-lg"
              >
                +
              </button>
            </div>
            {errors.quantity && (
              <p className="text-red-600 text-xs">{errors.quantity}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={secondsLeft > 0}
              className={` rounded-2xl border-2 border-dashed border-black bg-white px-6 py-3 font-semibold uppercase text-black transition-transform duration-300 hover:-translate-x-1 hover:-translate-y-1 hover:rounded-md hover:shadow-[4px_4px_0px_black] active:translate-x-0 active:translate-y-0 active:rounded-2xl active:shadow-none flex justify-center items-center gap-4
    ${
      secondsLeft > 0
        ? "  border-gray-500 text-gray-500 cursor-not-allowed"
        : " black-white"
    }
  `}
            >
              {secondsLeft > 0
                ? `Resend OTP in ${secondsLeft}s`
                : "Submit Order"}
            </button>
          </div>
        </form>

        {/* OTP Verification */}
        {showOtpInput && (
          <div className="flex flex-col items-center mt-5 space-y-3">
            <input
              type="text"
              placeholder="Enter OTP sent to your email"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="px-4 py-2 w-[60%] text-center border rounded focus:outline-none  border-gray-300 focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={handleVerifyOtp}
              className="rounded-xl bg-green-500 text-white px-5 py-2 font-semibold hover:bg-green-600 transition"
            >
              Verify OTP
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
