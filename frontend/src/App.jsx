import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/home';
import { OrderDetail } from './pages/orderDetail';
import { Toaster } from 'react-hot-toast';
import ThankYouPage from './pages/thank';



export const App=()=> {
  return (
    
    <Router>

       <Toaster  position="top-center" reverseOrder={false}/>
      <Routes>
     
        <Route path="/" element={<Home />} />
        <Route path="/order" element={<OrderDetail />} />
        <Route path="/thank-you" element={<ThankYouPage />} />
      </Routes>
    </Router>
  );
}

export default App;
