export const Form = ({ formData, onInputChange, onSubmit }) => {
  return (
    <div className="flex justify-center items-center h-screen w-screen bg-gray-100 p-10 ">
      <div className="bg-white p-8 rounded-xl shadow-lg ">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          📝 Fill Your Order Details
        </h1>
        <form className="space-y-5"  onSubmit={onSubmit}>
          {/* Name Field */}
          <div className="flex flex-col">
            <label htmlFor="name" className="text-gray-700 font-medium mb-1">
              Full Name
            </label>
            <input
            value={formData.name}
            onChange={onInputChange}
            name="name"
              type="text"
              id="name"
              placeholder="Enter your name"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              
            />
          </div>

          {/* Email Field */}
          <div className="flex flex-col">
            <label htmlFor="email" className="text-gray-700 font-medium mb-1">
              Email Address
            </label>
            <input
            value={formData.email}
            onChange={onInputChange}
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              
            />
          </div>
          {/* phone field */}
          <div className="flex flex-col">
            <label htmlFor="phone" className="text-gray-700 font-medium mb-1">
              Phone Number
            </label>
            <input
            value={formData.phone}
            onChange={onInputChange}
            name="phone"
              type="number"
              id="phone"
              placeholder="Enter your email"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              
            />
          </div>
          {/* Select Field */}
          <div className="flex flex-col">
            <label htmlFor="branch" className="text-gray-700 font-medium mb-1">
              Choose Branch
            </label>
            <select
            name="branch"
            value={formData.branch}
            onChange={onInputChange}
              id="branch"
              className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-- Select --</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Electronic Communication">Electronic Communication</option>
              <option value="Information Technology">Information Technology</option>
              <option value="Mechnical Engineering">Mechnical Engineering</option>
              <option value="Civil Engineering">Civil Engineering</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="year" className="text-gray-700 font-medium mb-1">
              Choose Year
            </label>
            <select
            name="year"
            value={formData.year}
            onChange={onInputChange}
              id="year"
              className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-- Select --</option>
              <option value="Freshman / First Year">Freshman / First Year </option>
              <option value="Sophomore / Second Year">Sophomore / Second Year </option>
              <option value="Junior / Third Year">Junior / Third Year </option>
              <option value="Senior / Fourth Year">Senior / Fourth Year</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="quantity"
              className="text-gray-700 font-medium mb-1"
            >
              Qauntity of File
            </label>
            <input
            value={formData.quantity}
            onChange={onInputChange}
              type="number"
              name="quantity"
              id="qauntity"
              placeholder="Enter File Quantity"
              
              
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Submit Order
          </button>
        </form>
      </div>
    </div>
  );
};
