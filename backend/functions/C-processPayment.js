exports.handler = async (event) => {
    try {
      const { amount, paymentMethod, orderId } = event;
  
      // Simulate payment processing (replace with actual payment gateway integration)
      if (paymentMethod === 'creditCard') {
        console.log(`Processing payment for order ${orderId}, amount: ${amount}`);
        return { status: 'SUCCESS', orderId };  // Payment successful
      } else {
        throw new Error('Payment method not supported');
      }
    } catch (error) {
      console.error("Error processing payment", error);
      throw new Error('Payment processing failed');
    }
  };
  