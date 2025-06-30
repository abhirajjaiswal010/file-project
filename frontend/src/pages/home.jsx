import React from "react";
import productImg from "../assets/png-file-.png"; // Adjust the path accordingly
import { useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Footer } from "../components/footer";

export const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 w-screen p-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-5xl w-full">
        {/* Image Section */}
        <div className="flex justify-center">
          <div className="w-80 transform transition-transform duration-300 hover:scale-105">
            <img
              src={productImg}
              alt="SVCE Product"
              className="rounded-lg object-cover"
            />
          </div>
        </div>

        {/* Details Section */}
        <div className="space-y-5 bg-white p-8 rounded-xl shadow-xl max-w-md flex flex-col mx-auto">
          <h1 className="text-4xl font-extrabold text-gray-800 leading-tight">
            SVCE Practical File
          </h1>

          <h5 className="text-xl font-medium text-blue-500 tracking-wide">
            Detail of Product
          </h5>

          <p className="text-gray-700 text-base leading-relaxed">
            Systematically prepared lab manual for engineering students as per
            the SVCE curriculum. The front page includes Name, Enrollment
            Number, Branch, Subject, and Department for clear identification.
          </p>

          <p className="text-red-500 font-semibold mb-5">Price: ₹15/-</p>

          <button
            className="rounded-2xl border-2 border-dashed border-black bg-white px-6 py-2 font-semibold uppercase text-black transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none block mx-auto"
            onClick={() => navigate("/order")}
          >
            <div className="flex flex-row justify-center items-center gap-5">
              <img src="/cart.gif" alt="" className="h-8" />
              Order Your Item
            </div>
          </button>
        </div>
      </div>
      <Toaster />
      
    </div>
  );
};
