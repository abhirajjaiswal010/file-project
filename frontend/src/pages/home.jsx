import React from "react";
import productImg from "../assets/png-file-.png"; // Adjust the path accordingly
import  {useNavigate}  from 'react-router-dom';
import { Toaster } from "react-hot-toast";
export const Home = () => {
  const navigate=useNavigate()
  return (
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center p-5 min-h-screen bg-gray-50 w-screen">
      {/* Image Section */}
      <div className="flex justify-center">
        <div className="w-80   transform transition-transform duration-300 hover:scale-105">
          <img
            src={productImg}
            alt="SVCE Product"
            className="rounded-lg object-cover"
          />
        </div>
      </div>

      {/* Details Section */}
      <div className="space-y-5  bg-white p-8 rounded-xl shadow-xl max-w-md flex flex-col">
        <h1 className="text-4xl font-extrabold text-gray-800 leading-tight">
          SVCE Practical File
        </h1>

        <h5 className="text-xl font-medium text-blue-500 tracking-wide">
          Detail of Product
        </h5>

        <p className="text-gray-700 text-base leading-relaxed">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis esse
          sequi sit impedit cumque accusamus. Neque esse corporis, incidunt
          deserunt culpa inventore! Nam, repellendus.
        </p>

        <button className="   bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-xl hover:from-blue-700 hover:to-blue-600 transition-all duration-300 ease-in-out"  onClick={() => navigate('/order')}>
          🛒 Order Your Item
        </button>
      </div>
    </div>
  );
};
