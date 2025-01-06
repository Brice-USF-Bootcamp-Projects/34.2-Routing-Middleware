// routes/items.js

const express = require('express');
const router = new express.Router();
const items = require('../fakeDb');
const ExpressError = require('../errorHandling/expressError')




router.get('/', (req, res) => {
    res.json(items);
  });

router.get('/:name', (req, res, next) => {
  try {
    const { name } = req.params;

    // Find the item in the array
    const foundItem = items.find(item => item.name === name);

    // Validate that the item exists
    if (!foundItem) {
      throw new ExpressError(`Item with name '${name}' not found`, 404); // Custom error
    }

    // Respond with the item
    res.json(foundItem);
  } catch (err) {
    next(err); // Pass errors to the error-handling middleware
  }
});



router.post('/', (req, res, next) => {
  try {
    const { name, price } = req.body; // Extract 'name' and 'price' from the request body

    // Validate the input: Ensure both 'name' and 'price' are provided
    if (!name || !price) {
      throw new ExpressError('Name and price are required', 400); // Custom error for missing input
    }

    // Create the new item object
    const newItem = { name, price };

    // Add the new item to the items array
    items.push(newItem);

    // Respond with the newly added item
    res.status(201).json({ added: newItem });
  } catch (err) {
    next(err); // Pass errors to the error-handling middleware
  }
});
