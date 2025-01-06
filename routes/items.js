// routes/items.js

const express = require('express');
const router = new express.Router();
const items = require('../fakeDb');
const ExpressError = require('../errorHandling/expressError');

// Get all items
router.get('/', (req, res) => {
  res.json(items);
});

// Get a single item by name
router.get('/:name', (req, res, next) => {
  try {
    const { name } = req.params;
    const foundItem = items.find(item => item.name === name);

    if (!foundItem) {
      throw new ExpressError(`Item with name '${name}' not found`, 404);
    }

    res.json(foundItem);
  } catch (err) {
    next(err);
  }
});

// Add a new item
router.post('/', (req, res, next) => {
  try {
    const { name, price } = req.body;

    if (!name || !price) {
      throw new ExpressError('Name and price are required', 400);
    }

    const newItem = { name, price };
    items.push(newItem);

    res.status(201).json({ added: newItem });
  } catch (err) {
    next(err);
  }
});

// Update an existing item
router.patch('/:name', (req, res, next) => {
  try {
    const { name } = req.params;
    const { name: newName, price } = req.body;

    const foundItem = items.find(item => item.name === name);

    if (!foundItem) {
      throw new ExpressError(`Item with name '${name}' not found`, 404);
    }

    if (!newName && !price) {
      throw new ExpressError('Name and/or price are required', 400); // Match test expectation
    }

    if (newName) foundItem.name = newName;
    if (price) foundItem.price = price;

    res.json({ updated: foundItem });
  } catch (err) {
    next(err);
  }
});



// Delete an item
router.delete('/:name', (req, res, next) => {
  try {
    const { name } = req.params;

    const itemIndex = items.findIndex(item => item.name === name);

    if (itemIndex === -1) {
      throw new ExpressError(`Item with name '${name}' not found`, 404);
    }

    items.splice(itemIndex, 1);
    res.json({ message: 'Deleted' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
