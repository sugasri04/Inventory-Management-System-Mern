
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageSales = () => {
  const [sales, setSales] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/sales/');
      setSales(response.data);
    } catch (error) {
      console.error('Error fetching sales records:', error);
    }
  };

  const deleteSale = async (id) => {
     if (!window.confirm('Are you sure you want to delete this sale record?')) return;

    try {
      await axios.delete(`http://localhost:5000/api/sales/${id}`);
      setSales(sales.filter((sale) => sale._id !== id));
      alert('Sale record deleted successfully!');
    } catch (error) {
      console.error('Error deleting sale record:', error);
    }
  };

  const filteredSales = sales.filter(
    (sale) =>
      sale.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sale.productName.toLowerCase().includes(searchTerm.toLowerCase())
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
      <h3 className="mb-4" style={{ color: '#3ec6ff' }}>Manage Sales Records</h3>

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by customer or product name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <table className="table table-hover table-bordered">
        <thead style={{ backgroundColor: '#3ec6ff', color: '#fff' }}>
          <tr>
            <th>Customer Name</th>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredSales.length > 0 ? (
            filteredSales.map((sale) => (
              <tr key={sale._id}>
                <td>{sale.customerName}</td>
                <td>{sale.productName}</td>
                <td>{sale.quantity}</td>
                <td>Rs.{sale.price}</td>
                <td>{new Date(sale.date).toLocaleDateString()}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteSale(sale._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">No sales records found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
);

};

export default ManageSales;
