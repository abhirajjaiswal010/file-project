import { useLocation } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const ThankYouPage = () => {
  const { state } = useLocation();

  if (!state) return <p className="p-6 text-center">✅ Payment success, but data missing.</p>;

  const {
    name,
    email,
    phone,
    branch,
    year,
    quantity,
    razorpay_order_id,
    razorpay_payment_id,
    totalAmount,
    paymentMode,
  } = state;

  const downloadReceipt = () => {
    const input = document.getElementById("receipt-content");
    html2canvas(input, { scale: 2, useCORS: true }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Receipt_${razorpay_order_id || "Order"}.pdf`);
    });
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <div className="bg-yellow-200 text-gray-800 py-2 overflow-hidden relative rounded-lg mb-3">
        <div
          className="whitespace-nowrap text-sm md:text-base font-semibold"
          style={{
            display: "inline-block",
            animation: "marquee 12s linear infinite",
          }}
        >
          🚀 Order now for early bird delivery On Monday 🚀
        </div>
      </div>
      <h1 className="text-3xl font-bold text-green-600 mb-1">Thank you!</h1>
      <p className="mb-2">Your order will be delivered at your college. 😊</p>
      <p className="mb-4">📞 For help: <strong>+91-8817880287</strong></p>

      {/* Receipt Content */}
      <div
        id="receipt-content"
        className="bg-gray-100 p-4 rounded shadow text-sm md:text-base"
      >
        <h2 className="text-lg font-semibold text-center mb-2">🧾 Payment Receipt</h2>
        <hr className="mb-2 border-gray-400" />
        <p><strong>Name:</strong> {name}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Phone:</strong> {phone}</p>
        <p><strong>Branch:</strong> {branch}</p>
        <p><strong>Year:</strong> {year}</p>
        <p><strong>Files:</strong> {quantity}</p>
        <p><strong>Order ID:</strong> {razorpay_order_id}</p>
        {razorpay_payment_id && (
          <p><strong>Payment ID:</strong> {razorpay_payment_id}</p>
        )}
        <p><strong>Payment Mode:</strong> {paymentMode}</p>
        <p><strong>Total Paid:</strong> ₹{totalAmount}</p>
        <hr className="mt-2 border-gray-400" />
        <p className="text-center text-gray-600 text-xs mt-2">
          Thank you for your order with SVCE Files.
        </p>
      </div>

      <button
        onClick={downloadReceipt}
        className="mt-4 w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition-all"
      >
        Download Receipt as PDF
      </button>
    </div>
  );
};

export default ThankYouPage;
