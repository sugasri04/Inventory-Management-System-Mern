import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalShow, setModalShow] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [updatedOrder, setUpdatedOrder] = useState({
    customerName: '',
    productName: '',
    quantity: '',
    price: '',
  });

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/orders');
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleDelete = async (orderId) => {
     if (!window.confirm('Are you sure you want to delete this item?')) return;

    try {
      await fetch(`http://localhost:5000/api/orders/${orderId}`, {
        method: 'DELETE',
      });
      fetchOrders();
      alert('Order deleted successfully!')
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  const handleUpdate = async (orderId) => {
    try {
      await fetch(`http://localhost:5000/api/orders/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedOrder),
      });
      fetchOrders();
      setModalShow(false);
       alert('Order updated successfully!')
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  const handleEditClick = (order) => {
    setSelectedOrder(order);
    setUpdatedOrder({
      customerName: order.customerName,
      productName: order.productName,
      quantity: order.quantity,
      price: order.price,
    });
    setModalShow(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedOrder(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredOrders = orders.filter(order =>
    order.customerName.toLowerCase().includes(searchTerm) ||
    order.productName.toLowerCase().includes(searchTerm)
  );

 return (
  <div className="container-fluid p-5" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
    <div
      className="mx-auto p-4"
      style={{
        backgroundColor: '#eaf9ff',
        borderRadius: '12px',
        maxWidth: '900px',
        minHeight: '400px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
      }}
    >
      <h2 className="mb-4" style={{ color: '#3ec6ff' }}>Manage Orders</h2>

      
      <div className="input-group mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search by Customer or Product"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

     
      <table className="table table-hover table-bordered">
        <thead style={{ backgroundColor: '#3ec6ff', color: '#fff' }}>
          <tr>
            <th>Customer Name</th>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Price ($)</th>
            <th>Actions</th>
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
                <td>
                  <button
                    className="btn btn-dark btn-sm me-2"
                    onClick={() => handleEditClick(order)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(order._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">No orders found</td>
            </tr>
          )}
        </tbody>
      </table>

      
      {modalShow && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1040,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            className="p-4"
            style={{
              backgroundColor: '#fff',
              borderRadius: '10px',
              width: '100%',
              maxWidth: '500px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
            }}
          >
            <h4 className="mb-3" style={{ color: '#3ec6ff' }}>Update Order</h4>
            <form>
              <div className="mb-3">
                <label className="form-label">Customer Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="customerName"
                  value={updatedOrder.customerName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Product Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="productName"
                  value={updatedOrder.productName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Quantity</label>
                <input
                  type="number"
                  className="form-control"
                  name="quantity"
                  value={updatedOrder.quantity}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Price</label>
                <input
                  type="number"
                  className="form-control"
                  name="price"
                  value={updatedOrder.price}
                  onChange={handleInputChange}
                />
              </div>
            </form>
            <div className="d-flex justify-content-end mt-4">
               <button
                type="button"
                className="btn btn-primary"
                onClick={() => handleUpdate(selectedOrder._id)}
              >
                Save changes
              </button>

              <button
                type="button"
                className="btn btn-secondary me-2"
                onClick={() => setModalShow(false)}
                style={{marginLeft:'10px'}}
              >
                Cancel
              </button>
             
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
);

};

export default ManageOrders;
