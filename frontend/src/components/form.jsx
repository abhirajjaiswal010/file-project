import { useState } from "react";

export const Form = ({ formData, onInputChange, onSubmit }) => {
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "⚠️ Please enter your full name.";
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      newErrors.email = "⚠️ Please enter a valid email address.";
    }

    // Phone number validation
    if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "⚠️ Phone number must be exactly 10 digits.";
    }

    // Quantity validation
    const quantity = Number(formData.quantity);
    if (isNaN(quantity) || quantity < 1 || quantity > 5) {
      newErrors.quantity = "⚠️ Quantity must be between 1 and 5.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onSubmit(e); // call the parent's submit handler
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Block negative numbers visually
    if ((name === "phone" || name === "quantity") && value < 0) return;

    onInputChange(e);
  };

  return (
    <div className="flex justify-center items-center h-screen w-screen bg-gray-100 p-5">
      <div className="bg-white p-5 rounded-xl shadow-lg ">
        <h1 className="text-3xl font-bold text-gray-800 mb-7 text-center">
          📝 Fill Your Order Details
        </h1>
        <form className="space-y-5" onSubmit={handleSubmit} noValidate>
          {/* Name */}
          <div className="flex flex-col">
            <label htmlFor="name" className="text-gray-700 font-medium  ">
              Full Name
            </label>
            <input
              value={formData.name}
              onChange={handleInputChange}
              name="name"
              type="text"
              id="name"
              placeholder="Enter your name"
              className="px-4  py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.name && (
              <p className="text-red-600 text-xs">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label htmlFor="email" className="text-gray-700 font-medium ">
              Email Address
            </label>
            <input
              value={formData.email}
              onChange={handleInputChange}
              type="email"
              id="email"
              name="email"
              placeholder="Enter a valid email"
              className="px-4  py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div className="flex flex-col">
            <label htmlFor="phone" className="text-gray-700 font-medium ">
              Phone Number
            </label>
            <input
              value={formData.phone}
              onChange={handleInputChange}
              name="phone"
              type="number"
              id="phone"
              min="0"
              placeholder="10-digit phone number"
              className="px-4  py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.phone && (
              <p className="text-red-600 text-sm mt-1">{errors.phone}</p>
            )}
          </div>

          {/* Branch */}
          <div className="flex flex-col">
            <label htmlFor="branch" className="text-gray-700 font-medium ">
              Choose Branch
            </label>
            <select
              name="branch"
              value={formData.branch}
              onChange={handleInputChange}
              id="branch"
              className="px-4  py12 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            <label htmlFor="year" className="text-gray-700 font-medium ">
              Choose Year
            </label>
            <select
              name="year"
              value={formData.year}
              onChange={handleInputChange}
              id="year"
              className="px-4  py12 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          <div className="flex flex-col m-auto">
            <label
              htmlFor="quantity"
              className="text-gray-700 font-medium mb-1"
            >
              Quantity of File
            </label>

            <div className="flex items-center justify-center space-x-2 mt-2">
              {/* Minus Button */}
              <button
                type="button"
                onClick={() => {
                  const qty = Math.max(1, Number(formData.quantity) - 1);
                  onInputChange({
                    target: {
                      name: "quantity",
                      value: qty,
                    },
                  });
                }}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-xl"
              >
                -
              </button>

              {/* Quantity Display */}
              <span className="px-4 py-2 border border-gray-300 rounded w-12 text-center">
                {formData.quantity}
              </span>

              {/* Plus Button */}
              <button
                type="button"
                onClick={() => {
                  const qty = Math.min(5, Number(formData.quantity) + 1);
                  onInputChange({
                    target: {
                      name: "quantity",
                      value: qty,
                    },
                  });
                }}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-xl"
              >
                +
              </button>
            </div>

            {/* Error Display */}
            {errors.quantity && (
              <p className="text-red-600 text-sm mt-1">{errors.quantity}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="rounded-2xl border-2 border-dashed border-black bg-white px-6 py-3 font-semibold uppercase text-black transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none"
          >
            Submit Order
          </button>
        </form>
      </div>
    </div>
  );
};
