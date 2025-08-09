
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const ManageSuppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/suppliers', {
          params: { search, filter }
        });
        setSuppliers(response.data);
      } catch (error) {
        console.error('Error fetching suppliers:', error.response ? error.response.data : error.message);
      }
    };

    fetchSuppliers();
  }, [search, filter]);

  const handleDelete = async (id) => {
      if (!window.confirm('Are you sure you want to delete this item?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/suppliers/${id}`);
      setSuppliers(suppliers.filter(supplier => supplier._id !== id));
      alert('Order deleted successfully!')
    } catch (error) {
      console.error('Error deleting supplier:', error.response ? error.response.data : error.message);
    }
  };

 return (
  <div className="container-fluid p-5" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
    <div
      className="mx-auto p-4"
      style={{
        backgroundColor: '#eaf9ff',
        borderRadius: '12px',
        maxWidth: '1000px',
        minHeight: '500px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
      }}
    >
      <h2 className="mb-4" style={{ color: '#3ec6ff' }}>Suppliers Dashboard</h2>

      
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search suppliers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ border: '1px solid #3ec6ff' }}
        />
      </div>

      
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Filter by products..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{ border: '1px solid #3ec6ff' }}
        />
      </div>

      
      <Link
        to="/dashboard/suppliers/add"
        className="btn mb-3"
        style={{ backgroundColor: '#3ec6ff', color: '#fff', border: 'none' }}
      >
        Add New Supplier
      </Link>

      
      <table className="table table-hover table-bordered">
        <thead style={{ backgroundColor: '#3ec6ff', color: '#fff' }}>
          <tr>
            <th>Supplier Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Address</th>
            <th>Supply Products</th>
            <th>Payment Terms</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.length > 0 ? (
            suppliers.map((supplier) => (
              <tr key={supplier._id}>
                <td>{supplier.supplierName}</td>
                <td>{supplier.phone}</td>
                <td>{supplier.email}</td>
                <td>{supplier.address}</td>
                <td>{supplier.supplyProducts}</td>
                <td>{supplier.paymentTerms}</td>
                <td>
                  <Link
                    to={`/dashboard/suppliers/edit/${supplier._id}`}
                    className="btn btn-sm me-2"
                    style={{ backgroundColor: 'black', color: '#fff', border: 'none' }}
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(supplier._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">No suppliers found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
);

};

export default ManageSuppliers;
