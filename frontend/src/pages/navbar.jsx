import { Link, useLocation } from 'react-router-dom';
import { IoHome } from "react-icons/io5";

export const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="bg-gray-50 py-2 sticky top-0 z-50 shadow-sm">
      <div className="max-w-5xl mx-auto px-4 flex justify-between items-center">
        {/* Logo and Title */}
        <div className="flex items-center space-x-3">
          <img src="/stationary.svg" alt="SVCE File Logo" className="h-10" />
          <h3 className="text-xl font-semibold text-gray-800">SVCE FILE</h3>
        </div>

        {/* Home Link */}
        {location.pathname !== "/" && (
          <Link 
            to="/" 
            className="flex items-center text-lg font-semibold text-blue-600 hover:text-blue-800 transition-colors duration-200"
            aria-label="Go to Home Page"
          >
            <IoHome className="mr-1" /> Home
          </Link>
        )}
      </div>
    </nav>
  );
};
