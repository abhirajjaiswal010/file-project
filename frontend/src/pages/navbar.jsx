import { Link, useLocation } from 'react-router-dom';

export const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="bg-gray-50 py-4  sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 flex justify-between items-center">
        {location.pathname !== "/" && (
          <Link to="/" className="text-lg font-semibold">🏠 Home</Link>
        )}
      </div>
    </nav>
  );
};
