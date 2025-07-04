import { useLocation } from "react-router-dom";

const ThankYouPage = () => {
  const { state } = useLocation();

  if (!state) return <p>Payment success, but data missing.</p>;

  const {
    name,
    email,
    phone,
    branch,
    year,
    quantity,
    razorpay_order_id,
    totalAmount,
  } = state;

  return (
    
    <div className="p-6">
       <div className="bg-yellow-200 text-gray-800 py-2 overflow-hidden relative rounded-lg mb-3">
        <div
          className="whitespace-nowrap text-sm md:text-base font-semibold "
          style={{
            display: "inline-block",
            whiteSpace: "nowrap",
            animation: "marquee 12s linear infinite",
          }}
        >
          🚀 Order now for early bird delivery on Mon bun🚀
        </div>
      </div>
      <h1 className="text-3xl font-bold text-green-600">Thank you!</h1>
      <p>Your order will be delivered at your college. 😊</p>
      <p className="mb-4">📞 For help: <strong>7987109645</strong></p>

      <div className="bg-gray-100 p-4 rounded">
        <p><strong>Name:</strong> {name}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Phone:</strong> {phone}</p>
        <p><strong>Branch:</strong> {branch}</p>
        <p><strong>Year:</strong> {year}</p>
        <p><strong>Files:</strong> {quantity}</p>
        <p><strong>Order ID:</strong> {razorpay_order_id}</p>
        <p><strong>Total Paid:</strong> ₹{totalAmount}</p>
      </div>
    </div>
  );
};

export default ThankYouPage;
