import React from "react";
import { useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import TiltedCard from "../animation/titlecard";
 // assuming Waves is a different component from DotGrid
import Header from "../components/header";
import Waves from "../animation/dotGrid";

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-screen min-h-screen overflow-hidden bg-[#f7ede2] flex flex-col items-center justify-center px-4 md:px-8 py-8">
      <Header />

      {/* Background Waves */}
      <div className="absolute inset-0 -z-10 w-full h-full">
        <Waves
          lineColor="#E8988A"
          backgroundColor="rgba(255, 255, 255, 0.2)"
          waveSpeedX={0.02}
          waveSpeedY={0.01}
          waveAmpX={40}
          waveAmpY={20}
          friction={0.9}
          tension={0.01}
          maxCursorMove={120}
          xGap={12}
          yGap={36}
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2  items-center max-w-[55rem] w-full mt-10">
        {/* Image Section */}
        <div className="flex justify-center">
          <TiltedCard
            imageSrc="/file.svg"
            altText="SVCE File"
            captionText="SVCE Practical File"
            containerHeight="300px"
            containerWidth="300px"
            imageHeight="300px"
            imageWidth="300px"
            rotateAmplitude={12}
            scaleOnHover={1.2}
            showMobileWarning={false}
            showTooltip={true}
            displayOverlayContent={true}
          />
        </div>

        {/* Details Section */}
        <div className="space-y-6 bg-white p-8 rounded-xl shadow-xl max-w-md mx-auto z-10">
          <h1 className="text-4xl font-extrabold text-gray-800 leading-tight text-center">
            SVCE Practical File
          </h1>

          <h5 className="text-xl font-medium text-blue-600 tracking-wide">
            Detail of Product
          </h5>

          <p className="text-gray-700 text-base leading-relaxed">
            Systematically prepared lab manual for engineering students as per
            the SVCE curriculum. The front page includes Name, Enrollment
            Number, Branch, Subject, and Department for clear identification.
          </p>

          <p className="mb-6">
            <span className="text-green-500 font-semibold">Price - </span>
            <span className="text-gray-400 line-through mr-3">₹25</span>
            <span className="text-red-600 font-semibold">₹13/- Only !!</span>
          </p>

          <button
            className="w-full rounded-2xl border-2 border-dashed border-black bg-white px-6 py-3 font-semibold uppercase text-black transition-transform duration-300 hover:-translate-x-1 hover:-translate-y-1 hover:rounded-md hover:shadow-[4px_4px_0px_black] active:translate-x-0 active:translate-y-0 active:rounded-2xl active:shadow-none flex justify-center items-center gap-4"
            onClick={() => navigate("/order")}
          >
            <img src="/cart.gif" alt="Cart Icon" className="h-8" />
            Order Your Item
          </button>
        </div>
      </div>

      <Toaster />
    </div>
  );
};
