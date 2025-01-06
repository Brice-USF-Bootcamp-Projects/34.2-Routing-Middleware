// app.js

const express = require('express');
const items = require('./fakeDb');
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Import routes
const itemRoutes = require('./routes/items');
app.use('/items', itemRoutes);

// Custom 404 handler
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not Found' });
});

// Error handler middleware
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.msg || 'Internal Server Error';
  res.status(status).json({ error: { message } });
});


// Export the app for testing
module.exports = app;

