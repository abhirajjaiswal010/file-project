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
  const pdf = new jsPDF();

  const pageWidth = pdf.internal.pageSize.getWidth();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;

  let y = 30;

  // Draw dashed border rectangle
  pdf.setLineDashPattern([2, 2], 0);
  pdf.rect(margin, y - 15, contentWidth, 120, 'S'); // (x, y, width, height, style)

  pdf.setFontSize(16);
  pdf.text("Payment Receipt", pageWidth / 2, y, { align: "center" });
  y += 10;

  const currentDateTime = new Date().toLocaleString();
  pdf.setFontSize(10);
  pdf.text(`Date: ${currentDateTime}`, pageWidth - margin, y, { align: "right" });
  y += 10;

  pdf.setFontSize(12);
  const lineSpacing = 8;

  const addLine = (label, value) => {
    pdf.text(`${label}:`, margin + 5, y);
    pdf.text(`${value}`, margin + 50, y);
    y += lineSpacing;
  };

  addLine("Name", name);
  addLine("Email", email);
  addLine("Phone", phone);
  addLine("Branch", branch);
  addLine("Year", year);
  addLine("Files", quantity);
  addLine("Order ID", razorpay_order_id || "N/A");
  if (razorpay_payment_id) {
    addLine("Payment ID", razorpay_payment_id);
  }
  addLine("Payment Mode", paymentMode);
  addLine("Total Paid", `${totalAmount}`);

  y += 10;
  pdf.setFontSize(10);
  pdf.text(
    "Thank you for your order with SVCE Files.",
    pageWidth / 2,
    y,
    { align: "center" }
  );

  pdf.save(`Receipt_${razorpay_order_id || "Order"}.pdf`);
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
          🚀 Order now for early bird delivery On Monday 15 <sup>th</sup> july  🚀
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
