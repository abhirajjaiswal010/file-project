import React from "react";

export const Header = () => {
  return (
    <>
      {/* Moving Alert Bar */}
      <div className="bg-yellow-200 text-gray-800 py-2 overflow-hidden relative rounded-lg mb-3">
        <div
          className="whitespace-nowrap text-sm md:text-base font-semibold "
          style={{
            display: "inline-block",
            whiteSpace: "nowrap",
            animation: "marquee 12s linear infinite",
          }}
        >
          🚀 Order now for early bird delivery on Monday 15 <sup>th</sup> July 🚀
        </div>
      </div>

      <header className="bg-gradient-to-r from-pink-100 to-yellow-100 py-10 px-6 text-center rounded-3xl shadow-lg">
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-800 mb-6">
          Why Choose Our SVCE Practical File?
        </h1>
        <div className="max-w-3xl mx-auto grid gap-4 md:grid-cols-2 text-left text-gray-700">
          <p>📚 <span className="font-semibold">Ready-to-Submit:</span> Professionally structured, zero formatting headache.</p>
          <p>🪐 <span className="font-semibold">SVCE Curriculum Aligned:</span> Strictly follows your college requirements.</p>
          <p>⏱️ <span className="font-semibold">Saves You Hours:</span> No manual writing or confusion, focus on study.</p>
          <p>✅ <span className="font-semibold">Clean & Error-Free:</span> Checked for syllabus alignment, neat presentation.</p>
          <p>🎓 <span className="font-semibold">Affordable:</span> Only ₹13/- vs. ₹25/- print shop rates.</p>
          <p>🌿 <span className="font-semibold">Instant & Digital:</span> Download immediately, print anytime, eco-friendly.</p>
        </div>
      </header>
    </>
  );
};

export default Header;
