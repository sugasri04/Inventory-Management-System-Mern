import React, { useState } from 'react';
import axios from 'axios';

const AddEmployee = ({ onEmployeeAdded }) => {
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newEmployee = { name, department, email };
      await axios.post('http://localhost:5000/api/employees', newEmployee);
      alert('Employee added successfully!');
      onEmployeeAdded();
      setName('');
      setDepartment('');
      setEmail('');
       
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  return (
  <div
    className="container p-5 rounded"
    style={{
      backgroundColor: 'white',
       maxWidth: '600px',
      minHeight: '550px',
      margin: '50px auto',
      color: '#3ec6ff'
    }}
  >
    <h3 className="mb-4 text-center" style={{ color: '#3ec6ff' }}>
      <i className="bi bi-person-plus-fill me-2"></i>Add New Employee
    </h3>

    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="name" className="form-label">Name</label>
        <input
          type="text"
          className="form-control"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{ height: '50px', borderColor: '#3ec6ff' }}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="department" className="form-label">Department</label>
        <input
          type="text"
          className="form-control"
          id="department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          required
          style={{ height: '50px', borderColor: '#3ec6ff' }}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="form-label">Email</label>
        <input
          type="email"
          className="form-control"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ height: '50px', borderColor: '#3ec6ff' }}
        />
      </div>
      <button
        type="submit"
        className="btn"
        style={{
          backgroundColor: '#3ec6ff',
          color: 'white',
          width: '100%',
          height: '50px',
          fontWeight: 'bold'
        }}
      >
        Add Employee
      </button>
    </form>
  </div>
);

};

export default AddEmployee;
