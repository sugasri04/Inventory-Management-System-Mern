const express = require('express');
const router = express.Router();
const InventoryItem = require('../models/InventoryItem');


router.get('/', async (req, res) => {
  try {
    const items = await InventoryItem.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching inventory items' });
  }
});


router.post('/add', async (req, res) => {
  const { name, quantity, price } = req.body;
  try {
    const newItem = new InventoryItem({ name, quantity, price });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: 'Error adding item' });
  }
});



router.get('/count', async (req, res) => {
  try {
    const count = await InventoryItem.countDocuments();
    res.json({ count });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, quantity, price } = req.body;
  try {
    const updatedItem = await InventoryItem.findByIdAndUpdate(
      id,
      { name, quantity, price },
      { new: true, runValidators: true }
    );
    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ error: 'Error updating item' });
  }
});


router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await InventoryItem.findByIdAndDelete(id);
    res.json({ message: 'Item deleted successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting item' });
  }
});

module.exports = router;
