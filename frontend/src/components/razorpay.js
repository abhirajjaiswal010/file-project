import toast from "react-hot-toast";

export const useRazorpayPayment = (formData, total, backendUrl) => {
  // Payment verification with Razorpay handler
  const handlePaymentVerify = async (data, onSuccess) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: data.amount,
      currency: data.currency,
      name: formData.name,
      description: "test mode",
      order_id: data.id,
        modal: {
        ondismiss: function () {
            // Called when user closes/cancels payment
            toast.error("❌ Order payment cancelled by user.");
        }},
      method: {
        upi: true,
        card: false,
        netbanking: false,
        wallet: false,
        emi: false,
        paylater: false,
      },
      handler: async (response) => {
        // Show verifying loader
        const verifyPromise = fetch(`${backendUrl}/api/payment/verify`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            ...formData,
          }),
        })
          .then(async (res) => {
            const result = await res.json();
            if (result.success) {
              onSuccess({
                ...formData,
                razorpay_order_id: response.razorpay_order_id,
                totalAmount: data.amount / 100,
              });
              return "Payment verified successfully!";
            } else {
              throw new Error("Payment verification failed.");
            }
          })
          .catch(() => {
            throw new Error("Verification request failed.");
          });

        // Use toast.promise for loader during verification
        toast.promise(verifyPromise, {
          loading: "Verifying payment...",
          success: (msg) => msg,
          error: (err) => err.message || "Verification failed.",
        });
      },
      prefill: {
        name: formData.name,
        email: formData.email,
      },
      theme: { color: "#3399cc" },
    };

    if (!window.Razorpay) {
      toast.error("Razorpay SDK not loaded.");
      return;
    }

    const razorpayObject = new window.Razorpay(options);
    razorpayObject.open();
  };

  // Payment initiation handler
  const handlePayment = async (onSuccess) => {
    const initiatePaymentPromise = fetch(`${backendUrl}/api/payment/order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: total }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (data.success === false) {
          throw new Error(data.message || "Failed to initiate payment.");
        }
        handlePaymentVerify(data.data, onSuccess);
        return "Redirecting to Razorpay...";
      })
      .catch((err) => {
        throw new Error(err.message || "Payment initiation failed.");
      });

    // Show loader while creating order
    toast.promise(initiatePaymentPromise, {
      loading: "Initiating payment...",
      success: (msg) => msg,
      error: (err) => err.message || "Failed to initiate payment.",
    });
  };

  return { handlePayment };
};
