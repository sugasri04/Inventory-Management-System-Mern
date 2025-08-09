
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageEmployee = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [formData, setFormData] = useState({ name: '', department: '', email: '' });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/employees');
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id) => {
     if (!window.confirm('Are you sure you want to remove this employee?')) return;

    try {
      await axios.delete(`http://localhost:5000/api/employees/${id}`);
      fetchEmployees();
      alert('Employee deleted successfully!');
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const handleEdit = (employee) => {
   
    setEditingEmployee(employee._id);
    setFormData({ name: employee.name, department: employee.department, email: employee.email });
   
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/employees/${editingEmployee}`, formData);
      setEditingEmployee(null);
      setFormData({ name: '', department: '', email: '' });
      fetchEmployees();
        alert('Employee updated successfully!');
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

 return (
  <div
    className="container-fluid p-5"
    style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}
  >
    <div
      className="mx-auto p-4"
      style={{
        backgroundColor: '#eaf9ff',
        borderRadius: '12px',
        maxWidth: '1000px',
        minHeight: '200px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
      }}
    >
      <h3 className="mb-4" style={{ color: '#3ec6ff' }}>
        Manage Employees
      </h3>

      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search by name, department, or email"
        value={searchTerm}
        onChange={handleSearch}
      />

      <table className="table table-hover table-bordered">
        <thead style={{ backgroundColor: '#3ec6ff', color: '#fff' }}>
          <tr>
            <th>Name</th>
            <th>Department</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.name}</td>
              <td>{employee.department}</td>
              <td>{employee.email}</td>
              <td>
                <button
                  className="btn btn-dark btn-sm me-2"
                  onClick={() => handleEdit(employee)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(employee._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingEmployee && (
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
            <h4 className="mb-3" style={{ color: '#3ec6ff' }}>
              Edit Employee
            </h4>
            <form onSubmit={handleUpdate}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="department" className="form-label">
                  Department
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <button
                type="submit"
                className="btn"
                style={{ backgroundColor: '#3ec6ff', color: 'white' }}
              >
                Update Employee
              </button>
              <button
                type="button"
                className="btn btn-secondary ms-2"
                onClick={() => {
                  setEditingEmployee(null);
                  setFormData({ name: '', department: '', email: '' });
                }}
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

export default ManageEmployee;
