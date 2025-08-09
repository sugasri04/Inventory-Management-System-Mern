import React, { useState } from 'react';
import '../css/AddOrder.css';

const AddOrder = () => {
  const [order, setOrder] = useState({
    customerName: '',
    productName: '',
    quantity: '',
    price: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Order saved:', data);
         alert('Order added successfully!');
        setOrder({ customerName: '', productName: '', quantity: '', price: '' });
      } else {
        console.error('Failed to save order');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div
      className="container"
      style={{
        maxWidth: '600px',
        padding: '40px',
       
        backgroundColor: '#ffffff',
       
      }}
    >
      <h3 className="mb-4" style={{ color: '#3ec6ff', fontWeight: '700' }}>
        <i className="bi bi-cart-plus-fill me-2"></i>New Order
      </h3>

      <form onSubmit={handleSubmit}>
       
        <div className="mb-4 input-group" style={{ height: '60px' }}>
          <span
            className="input-group-text bg-white border-primary"
            style={{
              color: '#3ec6ff',
              backgroundColor: '#e9faff',
              borderRadius: '50%',
              border: 'none'
            }}
          >
            <i className="bi bi-person-fill fs-5"></i>
          </span>
          <input
            type="text"
            className="form-control border-primary"
            placeholder="Customer Name"
            value={order.customerName}
            onChange={(e) => setOrder({ ...order, customerName: e.target.value })}
            style={{
              borderRadius: '10px',
              boxShadow: '0 0 6px rgba(62, 198, 255, 0.15)',
              marginLeft: '10px'
            }}
          />
        </div>

       
        <div className="mb-4 input-group" style={{ height: '60px' }}>
          <span
            className="input-group-text bg-white border-primary"
            style={{
              color: '#3ec6ff',
              backgroundColor: '#e9faff',
              borderRadius: '50%',
              border: 'none'
            }}
          >
            <i className="bi bi-box-seam fs-5"></i>
          </span>
          <input
            type="text"
            className="form-control border-primary"
            placeholder="Product Name"
            value={order.productName}
            onChange={(e) => setOrder({ ...order, productName: e.target.value })}
            style={{
              borderRadius: '10px',
              boxShadow: '0 0 6px rgba(62, 198, 255, 0.15)',
              marginLeft: '10px'
            }}
          />
        </div>

        
        <div className="mb-4 input-group" style={{ height: '60px' }}>
          <span
            className="input-group-text bg-white border-primary"
            style={{
              color: '#3ec6ff',
              backgroundColor: '#e9faff',
              borderRadius: '50%',
              border: 'none'
            }}
          >
            <i className="bi bi-list-ol fs-5"></i>
          </span>
          <input
            type="number"
            className="form-control border-primary"
            placeholder="Quantity"
            value={order.quantity}
            onChange={(e) => setOrder({ ...order, quantity: e.target.value })}
            style={{
              borderRadius: '10px',
              boxShadow: '0 0 6px rgba(62, 198, 255, 0.15)',
              marginLeft: '10px'
            }}
          />
        </div>

        
        <div className="mb-4 input-group" style={{ height: '60px' }}>
          <span
            className="input-group-text bg-white border-primary"
            style={{
              color: '#3ec6ff',
              backgroundColor: '#e9faff',
              borderRadius: '50%',
              border: 'none'
            }}
          >
            <i className="bi bi-currency-rupee fs-5"></i>
          </span>
          <input
            type="number"
            className="form-control border-primary"
            placeholder="Price"
            value={order.price}
            onChange={(e) => setOrder({ ...order, price: e.target.value })}
            style={{
              borderRadius: '10px',
              boxShadow: '0 0 6px rgba(62, 198, 255, 0.15)',
              marginLeft: '10px'
            }}
          />
        </div>

       
        <button
          type="submit"
          className="btn w-100 py-3 fs-5"
          style={{
            background: 'linear-gradient(to right, #3ec6ff, #00bfff)',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            fontWeight: '600'
        
          }}
      
        >
          <i className="bi bi-check-circle me-2"></i>Confirm Order
        </button>
      </form>
    </div>
  );
};

export default AddOrder;
