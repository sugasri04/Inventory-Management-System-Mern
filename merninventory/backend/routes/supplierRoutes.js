const express = require('express');
const router = express.Router();
const Supplier = require('../models/Supplier');


router.get('/', async (req, res) => {
  try {
    const { search, filter } = req.query;
    let query = {};

    if (search) {
      query.supplierName = { $regex: search, $options: 'i' };
    }

    if (filter) {
      query.supplyProducts = { $regex: filter, $options: 'i' };
    }

    const suppliers = await Supplier.find(query);
    res.json(suppliers);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving suppliers', error: error.message });
  }
});


router.get('/count', async (req, res) => {
  try {
    const count = await Supplier.countDocuments();
    res.json({ count });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }});

router.get('/:id', async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    if (supplier) {
      res.json(supplier);
    } else {
      res.status(404).json({ message: 'Supplier not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving supplier', error: error.message });
  }
});


router.post('/', async (req, res) => {
  const supplier = new Supplier(req.body);
  try {
    const newSupplier = await supplier.save();
    res.status(201).json(newSupplier);
  } catch (error) {
    res.status(400).json({ message: 'Error creating supplier', error: error.message });
  }
});


router.put('/:id', async (req, res) => {
  try {
    const updatedSupplier = await Supplier.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (updatedSupplier) {
      res.json(updatedSupplier);
    } else {
      res.status(404).json({ message: 'Supplier not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Error updating supplier', error: error.message });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const deletedSupplier = await Supplier.findByIdAndDelete(req.params.id);
    if (deletedSupplier) {
      res.json({ message: 'Supplier deleted' });
    } else {
      res.status(404).json({ message: 'Supplier not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting supplier', error: error.message });
  }
});

module.exports = router;
