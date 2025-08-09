import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ViewOrders = () => {
  
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/orders');
        if (response.ok) {
          const data = await response.json();
          setOrders(data);
          setFilteredOrders(data);
        } else {
          console.error('Failed to fetch orders');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchOrders();
  }, []);

  
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = orders.filter(order =>
      order.customerName.toLowerCase().includes(value) ||
      order.productName.toLowerCase().includes(value)
    );

    setFilteredOrders(filtered);
  };

  return (
  <div
    className="container p-5 rounded"
    style={{
      maxWidth: '900px',
      minHeight: '500px',
      backgroundColor: '#eaf9ff', 
      border: '2px solid #3ec6ff',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)' 
    }}
  >
    <h2 className="mb-4 text-center" style={{ color: '#3ec6ff' }}>
      Customer Orders
    </h2>

  
    <div className="input-group mb-4">
      <input
        type="text"
        className="form-control"
        placeholder="Search by Customer or Product"
        value={searchTerm}
        onChange={handleSearch}
        style={{
          border: '1px solid #3ec6ff',
          backgroundColor: '#f5fcff',
          color: '#333'
        }}
      />
    </div>

    
    <div style={{ overflowX: 'auto' }}>
      <table className="table table-bordered table-hover">
        <thead style={{ backgroundColor: '#3ec6ff', color: 'white' }}>
          <tr>
            <th scope="col">Customer Name</th>
            <th scope="col">Product Name</th>
            <th scope="col">Quantity</th>
            <th scope="col">Price</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.length > 0 ? (
            filteredOrders.map(order => (
              <tr key={order._id}>
                <td>{order.customerName}</td>
                <td>{order.productName}</td>
                <td>{order.quantity}</td>
                <td>{order.price}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center text-muted">No orders found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
);

};

export default ViewOrders;
