import { Link, useLocation } from 'react-router-dom';

export const Footer = () => {
  const location = useLocation();

  return (
    <footer className="bg-gray-100 text-gray-700 py-6 ">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center px-4 gap-4 text-center sm:text-left">

        <div className="text-sm">
          © {new Date().getFullYear()} YourCompanyName. All rights reserved.
        </div>

        <div className="flex flex-wrap justify-center sm:justify-end gap-4 text-sm">
          {location.pathname !== "/" && (
            <Link to="/" className="hover:underline">Home</Link>
          )}
          <Link to="/contact-us" className="hover:underline">Contact Us</Link>
          <Link to="/shipping-policy" className="hover:underline">Shipping Policy</Link>
          <Link to="/terms-and-conditions" className="hover:underline">Terms & Conditions</Link>
          <Link to="/cancellations-and-refunds" className="hover:underline">Cancellations & Refunds</Link>
          <Link to="/privacy-policy" className="hover:underline">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
};
