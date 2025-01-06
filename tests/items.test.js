// tests/items.test.js

const request = require('supertest');
const app = require('../app'); // Assuming your Express app is exported from app.js
let items = require('../fakeDb');

beforeEach(() => {
  // Set up some initial data before each test
  items.length = 0; // Clear the array
  items.push({ name: 'popsicle', price: 1.45 });
});

afterEach(() => {
  // Clean up after each test
  items.length = 0;
});

describe('Items Routes', () => {
  describe('GET /items', () => {
    test('It should return a list of items', async () => {
      const res = await request(app).get('/items');
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual([{ name: 'popsicle', price: 1.45 }]);
    });
  });

  describe('GET /items/:name', () => {
    test('It should return a single item', async () => {
      const res = await request(app).get('/items/popsicle');
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({ name: 'popsicle', price: 1.45 });
    });

    test('It should return 404 for a missing item', async () => {
      const res = await request(app).get('/items/nonexistent');
      expect(res.statusCode).toBe(404);
      expect(res.body.error.message).toEqual("Item with name 'nonexistent' not found");
    });
  });

  describe('POST /items', () => {
    test('It should add a new item', async () => {
      const res = await request(app)
        .post('/items')
        .send({ name: 'chips', price: 2.50 });
      expect(res.statusCode).toBe(201);
      expect(res.body).toEqual({ added: { name: 'chips', price: 2.50 } });
      expect(items.length).toBe(2);
    });

    test('It should return 400 for missing fields', async () => {
      const res = await request(app)
        .post('/items')
        .send({ price: 2.50 });
      expect(res.statusCode).toBe(400);
      expect(res.body.error.message).toEqual('Name and price are required');
    });
  });

  describe('PATCH /items/:name', () => {
    test('It should update an item', async () => {
      const res = await request(app)
        .patch('/items/popsicle')
        .send({ name: 'new popsicle', price: 2.45 });
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({
        updated: { name: 'new popsicle', price: 2.45 },
      });
      expect(items[0]).toEqual({ name: 'new popsicle', price: 2.45 });
    });

    test('It should return 404 for a missing item', async () => {
      const res = await request(app)
        .patch('/items/nonexistent')
        .send({ name: 'updated name', price: 5.00 });
      expect(res.statusCode).toBe(404);
      expect(res.body.error.message).toEqual("Item with name 'nonexistent' not found");
    });

    test('It should return 400 for missing fields', async () => {
      const res = await request(app).patch('/items/popsicle').send({});
      expect(res.statusCode).toBe(400);
      expect(res.body.error.message).toEqual('Name and/or price are required'); // Updated message
    });    
  });

  describe('DELETE /items/:name', () => {
    test('It should delete an item', async () => {
      const res = await request(app).delete('/items/popsicle');
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({ message: 'Deleted' });
      expect(items.length).toBe(0);
    });

    test('It should return 404 for a missing item', async () => {
      const res = await request(app).delete('/items/nonexistent');
      expect(res.statusCode).toBe(404);
      expect(res.body.error.message).toEqual("Item with name 'nonexistent' not found");
    });
  });
});
