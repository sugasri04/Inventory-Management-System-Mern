
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const EditSupplier = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [supplier, setSupplier] = useState({
    supplierName: '',
    phone: '',
    email: '',
    address: '',
    supplyProducts: '',
    paymentTerms: ''
  });

  useEffect(() => {
    if (id) {
      const fetchSupplier = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/suppliers/${id}`);
          setSupplier(response.data);
        } catch (error) {
          console.error('Error fetching supplier:', error);
        }
      };
      fetchSupplier();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSupplier({ ...supplier, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(`http://localhost:5000/api/suppliers/${id}`, supplier);
      } else {
        await axios.post('http://localhost:5000/api/suppliers', supplier);
      }
       alert('Order updated successfully!')
      navigate('/dashboard/suppliers/manage'); 
       
    } catch (error) {
      console.error('Error saving supplier:', error);
    }
  };

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
      <h2 className="mb-4" style={{ color: '#3ec6ff' }}>
        {id ? 'Edit Supplier' : 'Add New Supplier'}
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Supplier Name</label>
          <input
            type="text"
            className="form-control"
            name="supplierName"
            value={supplier.supplierName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Phone</label>
          <input
            type="text"
            className="form-control"
            name="phone"
            value={supplier.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={supplier.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Address</label>
          <input
            type="text"
            className="form-control"
            name="address"
            value={supplier.address}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Supply Products</label>
          <input
            type="text"
            className="form-control"
            name="supplyProducts"
            value={supplier.supplyProducts}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Payment Terms</label>
          <input
            type="text"
            className="form-control"
            name="paymentTerms"
            value={supplier.paymentTerms}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="btn"
          style={{ backgroundColor: '#3ec6ff', color: 'white' }}
        >
          {id ? 'Update Supplier' : 'Add Supplier'}
        </button>
      </form>
    </div>
  </div>
);

};

export default EditSupplier;
