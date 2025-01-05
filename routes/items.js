const express = require('express');
const router = new express.Router();
const items = require('../fakeDb');




router.get('/', (req, res) => {
    res.json(items);
  });
  