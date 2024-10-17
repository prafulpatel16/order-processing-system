import React, { useState, useEffect } from 'react';
import './OrderForm.css';  // Import CSS for styling
import { FaLinkedin, FaGithub, FaYoutube, FaMedium, FaDev, FaGlobe } from 'react-icons/fa';  // Import icons

function OrderForm() {
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [customerEmail, setCustomerEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState('');  // State for success message
  const [orderId, setOrderId] = useState('');  // State to store orderId
  const [currentTime, setCurrentTime] = useState(new Date());  // State to track current time

  // Update the time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Clean up the timer when the component is unmounted
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const order = {
      productId,
      quantity,
      customerEmail
    };

    try {
      const response = await fetch('https://88ax43nqed.execute-api.us-east-1.amazonaws.com/dev/place-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
      });

      if (response.ok) {
        const result = await response.json();
        const orderNumber = result.OrderId || result.orderId;  // Get the order number from the response

        if (orderNumber) {
          // Clear the form fields
          setProductId('');
          setQuantity(1);
          setCustomerEmail('');
          setOrderId(orderNumber);  // Set the order number
          setSuccessMessage('Order placed successfully!');  // Set success message
        } else {
          setSuccessMessage('Order placed successfully, but no Order Number returned.');
        }
      } else {
        const errorResult = await response.json();
        console.error('Error placing order:', errorResult);
        setSuccessMessage('Failed to place order. Please try again.');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      setSuccessMessage('Error placing order. Please try again.');
    }
  };

  return (
    <div className="order-form-container">
      {/* Display current date and time at the top */}
      <div className="time-display">
        {currentTime.toLocaleString()} {/* Format the date and time */}
      </div>

      <h1 className="title">AWS Serverless Order Management System</h1>

      <form onSubmit={handleSubmit} className="order-form">
        <div className="form-group">
          <label>Product ID:</label>
          <input
            type="text"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Quantity:</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Customer Email:</label>
          <input
            type="email"
            value={customerEmail}
            onChange={(e) => setCustomerEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">Place Order</button>

        {/* Display success message below the button */}
        {successMessage && <p className="success-message">{successMessage}</p>}
        {/* Display the Order Number in a different color */}
        {orderId && <p className="order-number">Order Number: <span>{orderId}</span></p>}
      </form>

      {/* Social Media Links with Icons */}
      <div className="social-links">
        <a href="https://www.praful.cloud" target="_blank" rel="noopener noreferrer">
          <FaGlobe className="social-icon" /> Website
        </a>
        <a href="https://linkedin.com/in/prafulpatel16" target="_blank" rel="noopener noreferrer">
          <FaLinkedin className="social-icon" /> LinkedIn
        </a>
        <a href="https://github.com/prafulpatel16/prafulpatel16" target="_blank" rel="noopener noreferrer">
          <FaGithub className="social-icon" /> GitHub
        </a>
        <a href="https://www.youtube.com/@prafulpatel16" target="_blank" rel="noopener noreferrer">
          <FaYoutube className="social-icon" /> YouTube
        </a>
        <a href="https://medium.com/@prafulpatel16" target="_blank" rel="noopener noreferrer">
          <FaMedium className="social-icon" /> Medium
        </a>
        <a href="https://dev.to/prafulpatel16" target="_blank" rel="noopener noreferrer">
          <FaDev className="social-icon" /> Dev.to
        </a>
      </div>

      {/* Footer with Developer Info */}
      <div className="footer">
        <p>
          Developed & Implemented By: 
          <a href="https://www.praful.cloud" target="_blank" rel="noopener noreferrer">
            PRAFUL PATEL
          </a>
        </p>
      </div>
    </div>
  );
}

export default OrderForm;
