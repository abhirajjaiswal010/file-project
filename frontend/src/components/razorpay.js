import toast from "react-hot-toast";

export const useRazorpayPayment = (formData, total, backendUrl) => {
  // Payment verification & Razorpay checkout handler
  const handlePaymentVerify = (orderData, onSuccess) => {
    if (!orderData) {
      toast.error("Payment order data is missing.");
      return;
    }

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: orderData.amount,
      currency: orderData.currency,
      name: formData.name,
      description: "test mode",
      order_id: orderData.id,
      modal: {
        ondismiss: () => {
          toast.error("Order payment cancelled by user");
        },
      },
      method: {
        upi: true,
        card: false,
        netbanking: false,
        wallet: false,
        emi: false,
        paylater: false,
      },
      handler: async (response) => {
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
                totalAmount: orderData.amount / 100,
              });
              return "Payment verified successfully!";
            } else {
              throw new Error("Payment verification failed.");
            }
          })
          .catch(() => {
            throw new Error("Verification request failed.");
          });

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
      theme: { color: "#F97316" }, // Warm & Friendly theme you wanted
    };

    if (!window.Razorpay) {
      toast.error("Razorpay SDK not loaded.");
      return;
    }

    const razorpayObject = new window.Razorpay(options);
    razorpayObject.open();
  };

  // Payment initiation handler
  const handlePayment = (onSuccess) => {
    const initiatePaymentPromise = fetch(`${backendUrl}/api/payment/order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: total }),
    })
      .then(async (res) => {
        const data = await res.json();

        if (!data || data.success === false) {
          throw new Error(data?.message || "Failed to initiate payment.");
        }

        // IMPORTANT: Your backend sends order object directly, so pass 'data' here (not data.data)
        handlePaymentVerify(data, onSuccess);

        return "Redirecting to Razorpay...";
      })
      .catch((err) => {
        throw new Error(err.message || "Payment initiation failed.");
      });

    toast.promise(initiatePaymentPromise, {
      loading: "Initiating payment...",
      success: (msg) => msg,
      error: (err) => err.message || "Failed to initiate payment.",
    });
  };

  return { handlePayment };
};
