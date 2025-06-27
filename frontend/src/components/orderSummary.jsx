import { useRazorpayPayment } from "./razorpay";
import { useNavigate } from "react-router-dom";
export const OrderSummary = ({ price, total, formData, setSubmitted }) => {
   
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_HOST_URL;

  const { handlePayment } = useRazorpayPayment(formData, total, backendUrl);

  const handleSuccess = (paymentData) => {
    navigate("/thank-you", { state: paymentData });
  };

 

 

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gray-50 p-4 antialiased capitalize">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-3">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Order Summary
        </h2>

        <InfoRow label="Name" value={formData.name} color="#FAF1E6" />
        <InfoRow label="Email" value={formData.email} color="#FFFDF0" />
        <InfoRow label="Branch" value={formData.branch} color="#FAF1E6" />
        <InfoRow label="Year" value={formData.year} color="#FFFDF0" />
        <InfoRow
          label="Quantity Of Files"
          value={formData.quantity}
          color="#FAF1E6"
        />
        <InfoRow label="Price Per Unit" value={`₹${price}`} color="#FFFDF0" />

        <hr className="border-solid border-2 border-gray-600 mt-10" />

        <div className="flex flex-row justify-between mt-6 text-2xl bg-green-200 py-1 px-3 rounded">
          <strong>Total Price</strong>
          <span>₹{total}</span>
        </div>

        <button
          className="rounded-2xl border-2 border-dashed border-black bg-white px-6 py-2 font-semibold uppercase text-black transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none block mx-auto mt-5"
          onClick={() => handlePayment(handleSuccess)}
        >
          Pay Now
        </button>

        <button
          className="mt-4 w-full text-center text-gray-600 underline hover:text-red-400"
          onClick={() => setSubmitted(false)}
        >
          Edit Order
        </button>
      </div>
    </div>
  );
};

// Reusable row component
const InfoRow = ({ label, value, color }) => (
  <div
    className="flex flex-row justify-between mb-4 py-1 px-3 rounded"
    style={{ backgroundColor: color }}
  >
    <strong>{label}</strong>
    <span>{value}</span>
  </div>
);
