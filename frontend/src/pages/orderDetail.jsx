import { useState } from "react";
import { Form } from "../components/form";
import { OrderSummary } from "../components/orderSummary";
import toast from "react-hot-toast";

export const OrderDetail = () => {
  // Fixed price per unit set by admin in ₹
  const pricePerUnit = 13; // ₹13 per unit

  const [formdata, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    branch: "",
    year: "",
    quantity: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleInputData = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitbtn = (event) => {
    event.preventDefault();

    if (
      !formdata.name ||
      !formdata.email ||
      !formdata.phone ||
      !formdata.branch ||
      !formdata.year ||
      !formdata.quantity
    ) {
      toast.error("Please fill all fields.", { duration: 1000 });
      return;
    }

    if (Number(formdata.quantity) > 5) {
      toast.error("Quantity must be less than 6", { duration: 1000 });
      return;
    }

    setSubmitted(true);
    toast.success("Form filled successfully");
  };

  const quantity = Number(formdata.quantity) || 0;

  // Core Razorpay fee + GST calculation
  const baseAmount = quantity * pricePerUnit * 100; // in paise
  const platformFee = baseAmount * 0.02; // 2%
  const gst = platformFee * 0.18; // 18% on platform fee
  const finalAmount = baseAmount + platformFee + gst; // in paise

  // Convert to ₹ with 2 decimals for display
  const finalAmountInRupees = (finalAmount / 100).toFixed(2);

  return (
    <>
      {!submitted ? (
        <Form
          formData={formdata}
          onInputChange={handleInputData}
          onSubmit={handleSubmitbtn}
        />
      ) : (
        <OrderSummary
          price={pricePerUnit}
          total={finalAmountInRupees} // pass the final amount including fees
          formData={formdata}
          setSubmitted={setSubmitted}
        />
      )}
    </>
  );
};
