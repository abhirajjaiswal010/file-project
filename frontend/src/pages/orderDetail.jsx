import { useState } from "react";
import { Form } from "../components/form";
import { OrderSummary } from "../components/orderSummary";
import toast from "react-hot-toast";

export const OrderDetail = () => {
  // Fixed price per unit set by admin
  const pricePerUnit = 15; // e.g., ₹100 per unit fixed

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
      toast.error("Please fill all fields.", {
        duration: 1000,
      });

      return;
    }

    if (Number(formdata.quantity) > 5) {
      toast.error("Quantity must be less than 6", {
        duration: 1000,
      });
      return;
    }

    setSubmitted(true);
    toast.success("Form Fill Successfully")
  };

  const totalPrice = Number(formdata.quantity) * pricePerUnit;

  return (
    <>
      {!submitted ? (
        <Form
          formData={formdata}
          onInputChange={handleInputData}
          onSubmit={handleSubmitbtn}
          // send to form to show price info (optional)
        />
      ) : (
        <OrderSummary
          price={pricePerUnit}
          total={totalPrice}
          formData={formdata}
          setSubmitted={setSubmitted}
        />
      )}
    </>
  );
};
