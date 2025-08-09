import React, { useState } from 'react';
import axios from 'axios';
import 'jspdf-autotable';

const GenerateReport = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [report, setReport] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('http://localhost:5000/api/reports/sales-report', {
        params: { startDate, endDate },
       
      });
        

     
      const updatedData = response.data.map(item => ({
        ...item,
        totalBill: item.totalQuantity * item.totalSales, 
      }));

      setReport(updatedData);
      
    } catch (error) {
      console.error('Error generating report:', error);
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
      <h3 className="mb-4" style={{ color: '#3ec6ff' }}>Generate Sales Report</h3>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="startDate" className="form-label">Start Date</label>
          <input
            type="date"
            className="form-control"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="endDate" className="form-label">End Date</label>
          <input
            type="date"
            className="form-control"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="btn"
          style={{ backgroundColor: '#3ec6ff', color: '#fff', border: 'none' }}
        >
          Generate Report
        </button>
      </form>

      {report.length > 0 && (
        <div className="mt-4">
          <h5 style={{ color: '#3ec6ff' }}>Report Results</h5>
          <table className="table table-hover table-bordered">
            <thead style={{ backgroundColor: '#3ec6ff', color: '#fff' }}>
              <tr>
                <th>Product Name</th>
                <th>Total Price</th>
                <th>Total Quantity</th>
                <th>Total Amount</th>
              </tr>
            </thead>
            <tbody>
              {report.map((item, index) => (
                <tr key={index}>
                  <td>{item._id}</td>
                  <td>Rs. {item.totalSales}</td>
                  <td>{item.totalQuantity}</td>
                  <td>Rs. {item.totalBill}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  </div>
);

};

export default GenerateReport;
