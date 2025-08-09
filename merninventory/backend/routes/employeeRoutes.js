
const express = require('express');
const router = express.Router();
const Employee = require('../models/employeeModel');


router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});


router.get('/count', async (req, res) => {
  try {
    const count = await Employee.countDocuments();
    res.json({ count });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, department, email } = req.body;

   
    const newEmployee = new Employee({
      name,
      department,
      email,
    });

    
    await newEmployee.save();

    res.status(201).json({ message: 'Employee added successfully', employee: newEmployee });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});


router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, department, email } = req.body;

    
    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      { name, department, email },
      { new: true } 
    );

    if (!updatedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.json({ message: 'Employee updated successfully', employee: updatedEmployee });
  } catch (error) {
    console.error('Error updating employee:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    
    const deletedEmployee = await Employee.findByIdAndDelete(id);

    if (!deletedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.json({ message: 'Employee deleted successfully' });
  } catch (error) {
    console.error('Error deleting employee:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
