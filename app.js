const express = require('express');
const items = require('./fakeDb');
const app = express();

app.use(express.json()); // Parse JSON bodies

// Routes will go here

const itemRoutes = require('./routes/items');
app.use('/items', itemRoutes);
