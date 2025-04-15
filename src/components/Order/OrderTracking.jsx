import { useState, useEffect } from 'react';
import { FaShippingFast, FaCheckCircle, FaBoxOpen } from 'react-icons/fa';

const OrderTracking = ({ orderId }) => {
  const [status, setStatus] = useState('processing');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate order progress
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setStatus('delivered');
          return 100;
        }
        return prev + 10;
      });
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  const getStatusIcon = (step) => {
    switch (step) {
      case 'processing':
        return <FaCheckCircle className="icon processing" />;
      case 'shipped':
        return <FaShippingFast className="icon shipped" />;
      case 'delivered':
        return <FaBoxOpen className="icon delivered" />;
      default:
        return <FaCheckCircle className="icon" />;
    }
  };

  return (
    <div className="order-tracking">
      <h2>Order Tracking</h2>
      <p className="order-id">Order ID: #{orderId}</p>
      
      <div className="progress-bar">
        <div className="progress" style={{ width: `${progress}%` }}></div>
      </div>

      <div className="status-steps">
        <div className={`step ${status === 'processing' ? 'active' : ''}`}>
          {getStatusIcon('processing')}
          <p>Processing</p>
        </div>
        <div className={`step ${status === 'shipped' ? 'active' : ''}`}>
          {getStatusIcon('shipped')}
          <p>Shipped</p>
        </div>
        <div className={`step ${status === 'delivered' ? 'active' : ''}`}>
          {getStatusIcon('delivered')}
          <p>Delivered</p>
        </div>
      </div>

      <div className="status-details">
        {status === 'processing' && (
          <p>Your order is being prepared for shipment.</p>
        )}
        {status === 'shipped' && (
          <p>Your order is on the way! Expected delivery soon.</p>
        )}
        {status === 'delivered' && (
          <p>Your order has been delivered. Enjoy your purchase!</p>
        )}
      </div>
    </div>
  );
};

export default OrderTracking;