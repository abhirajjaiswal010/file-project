import React from "react";
import { useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import TiltedCard from "../animation/titlecard";
import DotGrid from "../animation/dotGrid";



export const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-screen min-h-screen overflow-hidden bg-gray-[#f7ede2]  flex items-center justify-center">
      
      {/* DotGrid Background */}
      <div className="absolute inset-0 -z-9 w-screen h-screen">
        <DotGrid
          dotSize={4}
          gap={11}
          baseColor="#FEF3E2"
          activeColor="#F3C623"
          proximity={100}
          shockRadius={50}
          shockStrength={5}
          resistance={750}
          returnDuration={1.5}
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-5xl w-full">
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
        <div className="space-y-5 bg-white p-8 rounded-xl shadow-xl max-w-md flex flex-col mx-auto z-10">
         
  

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

       <p className="mb-5">
        <span className="text-green-400 font-semibold">Price  -  </span>
  <span className="text-gray-500 line-through mr-2">₹25</span>
  <span className="text-red-500 font-semibold">₹13/- Only !!</span>
</p>

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
