import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageInventories = () => {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');
  const [editItem, setEditItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:5000/api/inventory');
      setItems(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      setError('Error fetching inventory items');
      console.error('Error fetching inventory items:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;

    setError(null);
    try {
      await axios.delete(`http://localhost:5000/api/inventory/${id}`);
      setItems((prevItems) => prevItems.filter((item) => item._id !== id)); // Optimistic update
      alert('Item deleted successfully!');
    } catch (err) {
      setError('Error deleting item');
      console.error('Error deleting item:', err);
    }
  };

  const handleEdit = (item) => {
    setEditItem(item);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await axios.put(`http://localhost:5000/api/inventory/${editItem._id}`, editItem);
      setItems((prevItems) =>
        prevItems.map((item) =>
          item._id === editItem._id ? editItem : item
        )
      ); // Optimistic update
      setEditItem(null);
      alert('Item updated successfully!');
    } catch (err) {
      setError('Error updating item');
      console.error('Error updating item:', err);
    }
  };

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
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
      <h3 className="mb-4" style={{ color: '#3ec6ff' }}>Manage Inventory</h3>

      {error && <div className="alert alert-danger">{error}</div>}

      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search items..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading ? (
        <div>Loading...</div>
      ) : filteredItems.length === 0 ? (
        <div>No items found</div>
      ) : (
        <table className="table table-hover table-bordered">
          <thead style={{ backgroundColor: '#3ec6ff', color: '#fff' }}>
            <tr>
              <th>Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>{item.price}</td>
                <td>
                  <button
                    className="btn btn-dark btn-sm me-2"
                    onClick={() => handleEdit(item)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {editItem && (
        <div
          style={{
            backgroundColor: 'rgba(0,0,0,0.5)',
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 1050,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            className="p-4"
            style={{
              backgroundColor: '#fff',
              borderRadius: '12px',
              maxWidth: '500px',
              width: '100%',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
            }}
          >
            <h4 className="mb-3" style={{ color: '#3ec6ff' }}>Edit Item</h4>
            <form onSubmit={handleUpdate}>
              <div className="mb-3">
                <label htmlFor="editName" className="form-label">Item Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="editName"
                  value={editItem.name}
                  onChange={(e) =>
                    setEditItem({ ...editItem, name: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="editQuantity" className="form-label">Quantity</label>
                <input
                  type="number"
                  className="form-control"
                  id="editQuantity"
                  value={editItem.quantity}
                  onChange={(e) =>
                    setEditItem({ ...editItem, quantity: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="editPrice" className="form-label">Price</label>
                <input
                  type="number"
                  className="form-control"
                  id="editPrice"
                  value={editItem.price}
                  onChange={(e) =>
                    setEditItem({ ...editItem, price: e.target.value })
                  }
                  required
                />
              </div>
              <button
                type="submit"
                className="btn"
                style={{ backgroundColor: '#3ec6ff', color: 'white' }}
              >
                Update Item
              </button>
              <button
                type="button"
                className="btn btn-secondary ms-2"
                onClick={() => setEditItem(null)}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  </div>
);

};

export default ManageInventories;
