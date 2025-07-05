import { useState } from "react";
import { Form } from "../components/form";
import { OrderSummary } from "../components/orderSummary";
import toast from "react-hot-toast";

export const OrderDetail = () => {
  const pricePerUnit = 13;

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

  // Handles the initial form submission event (with event.preventDefault)
  const handleFormSubmit = (event) => {
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

    // This just starts OTP verification in Form component,
    // so don't mark submitted yet here.
  };

  // Final submit after OTP verification, no event needed here
  const finalSubmit = () => {
    setSubmitted(true);
    toast.success("Form filled successfully");
  };

  const quantity = Number(formdata.quantity) || 0;

  const baseAmount = quantity * pricePerUnit;
  const platformFee = baseAmount * 0.02;
  const gst = platformFee * 0.18;
  const total = baseAmount + platformFee + gst;

  const values = {
    baseAmount: baseAmount.toFixed(2),
    platformFee: platformFee.toFixed(2),
    gst: gst.toFixed(2),
    total: total.toFixed(2),
  };

  return (
    <>
      {!submitted ? (
        <Form
          formData={formdata}
          onInputChange={handleInputData}
          onSubmit={handleFormSubmit}  // this handles form submit event (with e.preventDefault)
          onFinalSubmit={finalSubmit}  // called after OTP verify, no event
        />
      ) : (
        <OrderSummary
          price={pricePerUnit}
          breakdown={values}
          formData={formdata}
          setSubmitted={setSubmitted}
        />
      )}
    </>
  );
};
