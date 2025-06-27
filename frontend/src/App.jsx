import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/home';
import { OrderDetail } from './pages/orderDetail';
import { Toaster } from 'react-hot-toast';
import ThankYouPage from './pages/thank';
import { Footer } from './components/footer';
import { PrivacyPolicy } from './pages/razorpayApproval/privacypolicy';
import { TermsAndConditions } from './pages/razorpayApproval/termandcondition';
import { ShippingPolicy } from './pages/razorpayApproval/shippingPolicy';
import { CancellationsAndRefunds } from './pages/razorpayApproval/cancellationandrefund';
import { ContactUs } from './pages/razorpayApproval/contactus';
import { Navbar } from './pages/navbar';

export const App = () => {
  return (
    <Router>
      <div className="flex flex-col w-screen h-screen overflow-x-hidden">
        <Navbar/>
        <Toaster position="top-center" reverseOrder={false} />

        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/order" element={<OrderDetail />} />
            <Route path="/thank-you" element={<ThankYouPage />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
            <Route path="/shipping-policy" element={<ShippingPolicy />} />
            <Route path="/cancellations-and-refunds" element={<CancellationsAndRefunds />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
