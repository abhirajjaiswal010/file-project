import { useState } from "react";
import GradientText from "../animation/shinytext";
import { useRazorpayPayment } from "./razorpay";
import { useNavigate } from "react-router-dom";

export const OrderSummary = ({ price, formData, setSubmitted, breakdown }) => {
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_HOST_URL;


  const { handlePayment } = useRazorpayPayment(
    formData,
    breakdown.total,
    backendUrl
  );

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentMode, setPaymentMode] = useState("online");

  // Helper to notify owner via backend API
  const notifyOwner = async (orderData) => {
    try {
      await fetch(`${backendUrl}/api/notify-owner`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });
    } catch (error) {
      console.error("Failed to notify owner:", error);
    }
  };

  const handleSuccess = async (paymentData) => {
    const orderData = {
      ...formData,
      razorpay_order_id: paymentData.razorpay_order_id,
      razorpay_payment_id: paymentData.razorpay_payment_id,
      totalAmount: breakdown.total,
      paymentMode: "Online Payment",
    };

    // Notify owner about online payment order
    await notifyOwner(orderData);

    navigate("/thank-you", {
      state: orderData,
    });
  };

  const handleConfirmPayment = async () => {
    setShowPaymentModal(false);

    if (paymentMode === "online") {
      handlePayment(handleSuccess);
    } else if (paymentMode === "cod") {
      try {
        const orderData = {
          ...formData,
          totalAmount: breakdown.total,
          razorpay_order_id: "COD-" + Date.now(),
          paymentMode: "Cash On Delivery",
        };

        // Send order to backend COD endpoint (for your tracking)
        await fetch(`${backendUrl}/api/orders/cod`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderData),
        });

        // Notify owner about COD order
        await notifyOwner(orderData);

        navigate("/thank-you", {
          state: orderData,
        });
      } catch (error) {
        console.error("Error placing COD order:", error);
        alert("Failed to place COD order, please try again.");
      }
    }
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-[#F6F0F0] p-4 antialiased capitalize">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-3 relative">
        <GradientText
          colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
          animationSpeed={3}
          showBorder={false}
          className="custom-class text-3xl font-bold mb-3"
        >
          Order Summary
        </GradientText>

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

        <hr className="border-solid border-2 border-gray-600 mt-6 mb-4" />

        <InfoRow
          label="Base Price"
          value={`₹${breakdown.baseAmount}`}
          color="#FAF1E6"
        />
        <InfoRow
          label="Platform Fee (2%)"
          value={`₹${breakdown.platformFee}`}
          color="#FFFDF0"
        />
        <InfoRow
          label="GST on Platform Fee (18%)"
          value={`₹${breakdown.gst}`}
          color="#FAF1E6"
        />

        <div className="flex flex-row justify-between mt-6 text-2xl bg-green-200 py-1 px-3 rounded">
          <strong>Total Payable</strong>
          <span>₹{breakdown.total}</span>
        </div>

        <button
          className="rounded-2xl border-2 border-dashed border-black bg-white px-6 py-2 font-semibold uppercase text-black transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none block mx-auto mt-5"
          onClick={handlePayNowClick}
        >
          Pay Now
        </button>

        <button
          className="mt-4 w-full text-center text-gray-600 underline hover:text-red-400"
          onClick={() => setSubmitted(false)}
        >
          Edit Order
        </button>

        {showPaymentModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-80">
              <h2 className="text-xl font-bold mb-4 text-center">
                Choose Payment Mode
              </h2>
              <div className="mb-4">
                <label className="flex items-center mb-2">
                  <input
                    type="radio"
                    value="online"
                    checked={paymentMode === "online"}
                    onChange={() => setPaymentMode("online")}
                    className="mr-2"
                  />
                  Online Payment
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="cod"
                    checked={paymentMode === "cod"}
                    onChange={() => setPaymentMode("cod")}
                    className="mr-2"
                  />
                  Cash on Delivery (COD)
                </label>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setShowPaymentModal(false)}
                  className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmPayment}
                  className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  function handlePayNowClick() {
    setShowPaymentModal(true);
  }
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
