import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login'; 
import Signup from './components/Signup'; 
import Dashboard from './components/Dashboard';
import AddOrder from './components/AddOrder'; 
import Layout from './components/Layout'; 
import './App.css';
import ViewOrders from './components/ViewOrders'; 
import ManageOrders from './components/ManageOrders'; 
import AddSupplier from './components/AddSupplier'; 
import ManageSuppliers from './components/ManageSuppliers'; 
import EditSupplier from './components/EditSupplier'; 
import AddInventoryItem from './components/AddInventoryItem'; 
import ManageInventories from './components/ManageInventories'; 
import AddSalesRecord from './components/AddSalesRecord';
import ManageSales from './components/ManageSales';
import GenerateReport from './components/GenerateReport';
import AddEmployee from './components/AddEmployee';
import ManageEmployee from './components/ManageEmployee';
import Settings from './components/Settings';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <Router>
      <Routes>
      
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
     
        <Route path="/dashboard" element={<Layout />}>
        
          <Route index element={<Dashboard />} /> 
          <Route path="orders/add" element={<AddOrder />} />
          <Route path="orders/view" element={<ViewOrders />} />
          <Route path="orders/manage" element={<ManageOrders />} />
          <Route path="suppliers/add" element={<AddSupplier />} />
          <Route path="suppliers/manage" element={<ManageSuppliers />} />
          <Route path="suppliers/edit/:id" element={<EditSupplier />} />
          <Route path="inventory/add" element={<AddInventoryItem />} />
          <Route path="inventory/add1" element={<ManageInventories />} />
          <Route path="sales/add" element={<AddSalesRecord />} />
          <Route path="sales/manage" element={<ManageSales />}/>
          <Route path="sales/report" element={<GenerateReport />}/>
          <Route path="Employeess/add" element={<AddEmployee/>}/>
          <Route path="Employees/manage" element={<ManageEmployee/>}/>
          <Route path="settings" element={<Settings/>}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
