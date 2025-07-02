import { useState, useRef } from "react";
import TiltedCard from "../animation/titlecard";

export const HomeContent = () => {
  const [fileName, setFileName] = useState(null);
  const fileInputRef = useRef();

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type === "application/pdf") {
      setFileName(file.name);
      // Optional: Handle upload logic here
    } else {
      alert("Please upload a PDF file only.");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setFileName(file.name);
      // Optional: Handle upload logic here
    } else {
      alert("Please upload a PDF file only.");
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 items-center max-w-[55rem] w-full mt-10 mx-auto px-4">
      {/* Image Section */}
      <div className="flex justify-center mb-6 md:mb-0">
        <TiltedCard
          imageSrc="/inkjet.svg"
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
      <div
        className="space-y-8 bg-gradient-to-br from-[#fdfbfb] to-[#ebedee] p-9 rounded-xl shadow-xl w-[104%] max-w-[27.5rem] h-auto mx-auto z-10"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 leading-tight text-center">
          Print Your File
        </h1>

        <h5 className="text-lg md:text-xl font-medium text-blue-600 tracking-wide text-center">
          Upload your lab manual PDF here
        </h5>

        <div
          className="w-full rounded-2xl border-2 border-dashed border-black bg-white px-6 py-8 flex flex-col items-center justify-center text-center cursor-pointer transition-transform duration-300 hover:-translate-y-1 hover:shadow-[4px_4px_0px_black]"
          onClick={() => fileInputRef.current.click()}
        >
          <img src="/upload.gif" alt="Upload Icon" className="h-16 mb-4" />
          {fileName ? (
            <p className="text-green-600 font-semibold">{fileName} uploaded</p>
          ) : (
            <>
              <p className="text-black font-semibold">Drag & Drop your PDF here</p>
              <p className="text-gray-500 text-sm mt-1">or click to select a file</p>
            </>
          )}
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            ref={fileInputRef}
            className="hidden"
          />

       
        </div>
        <p className="text-lg font-semibold text-gray-600 text-center text-red-500">
  Working in progress<span className="dots"></span>
</p>

      </div>
    </div>
  );
};
