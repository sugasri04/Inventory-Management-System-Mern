import React, { useState } from 'react';
import axios from 'axios';

const AddInventoryItem = () => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const newItem = { name, quantity: Number(quantity), price: Number(price) };
      await axios.post('http://localhost:5000/api/inventory/add', newItem);
      setName('');
      setQuantity('');
      setPrice('');
      alert('Item added successfully!');
    } catch (error) {
      console.error('Error adding item:', error);
      setError('Failed to add item. Please try again.');
    } finally {
      setLoading(false);
    }
  };

 return (
  <div className="container p-5 rounded shadow bg-white" style={{ maxWidth: '600px' ,fontFamily:'900',color:'#34b8f1ff' }}>
    <h3 className="mb-4">
      <i className="bi bi-box-seam-fill me-2"></i>Add Inventory Item
    </h3>

    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="name" className="form-label">Item Name</label>
        <input
          type="text"
          className="form-control custom-input"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="quantity" className="form-label">Quantity</label>
        <input
          type="number"
          className="form-control custom-input"
          id="quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="price" className="form-label">Price</label>
        <input
          type="number"
          className="form-control custom-input"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>

      <button type="submit" className="btn btn-primary px-4 py-2" disabled={loading}>
        {loading ? 'Adding...' : 'Add Item'}
      </button>

      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </form>
  </div>
);

};

export default AddInventoryItem;
