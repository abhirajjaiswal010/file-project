import toast from "react-hot-toast";


export const useRazorpayPayment = (formData, total, backendUrl) => {
  const handlePaymentVerify = async (data, onSuccess) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: data.amount,
      currency: data.currency,
      name: formData.name,
      description: "test mode",
      order_id: data.id,
      method:{
        upi:true,
        card:false,
        netbanking:false,
        wallet:false,
        emi:false,
        paylater:false,
      },
      handler: async (response) => {
        try {
          const res = await fetch(`${backendUrl}/api/payment/verify`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              ...formData,
            }),
          });

          const result = await res.json();
          if (result.success) {
            toast.success("Payment successful!");
            onSuccess({
              ...formData,
              razorpay_order_id: response.razorpay_order_id,
              totalAmount: data.amount / 100,
            });
          }
        } catch (error) {
          toast.error("Verification failed");
        }
      },
      prefill: {
        name: formData.name,
        email: formData.email,
        
      },
      theme: {
        color: "#3399cc",
      },
    };

    if (!window.Razorpay) {
      toast.error("Razorpay SDK not loaded");
      return;
    }

    const razorpayObject = new window.Razorpay(options);
    razorpayObject.open();
  };

  const handlePayment = async (onSuccess) => {
    try {
      const res = await fetch(`${backendUrl}/api/payment/order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: total }),
      });

      const data = await res.json();
      handlePaymentVerify(data.data, onSuccess);
    } catch (error) {
      toast.error("Failed to initiate payment.");
    }
  };

  return { handlePayment };
};
