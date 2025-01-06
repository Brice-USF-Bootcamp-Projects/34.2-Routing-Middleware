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

describe('PATCH /items/:name', () => {
  test('Successfully updates an item', async () => {
    const res = await request(app)
      .patch('/items/popsicle')
      .send({ name: 'new popsicle', price: 2.45 });

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      updated: { name: 'new popsicle', price: 2.45 },
    });
    expect(items[0]).toEqual({ name: 'new popsicle', price: 2.45 });
  });

  test('Responds with 404 for non-existent item', async () => {
    const res = await request(app)
      .patch('/items/nonexistent')
      .send({ name: 'updated name', price: 5.00 });

    expect(res.statusCode).toBe(404);
    expect(res.body.error).toEqual("Item with name 'nonexistent' not found");
  });

  test('Responds with 400 for missing fields', async () => {
    const res = await request(app).patch('/items/popsicle').send({});
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toEqual('Name and price are required');
  });
});

describe('DELETE /items/:name', () => {
  test('Successfully deletes an item', async () => {
    const res = await request(app).delete('/items/popsicle');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: 'Deleted' });
    expect(items.length).toBe(0);
  });

  test('Responds with 404 for non-existent item', async () => {
    const res = await request(app).delete('/items/nonexistent');
    expect(res.statusCode).toBe(404);
    expect(res.body.error).toEqual("Item with name 'nonexistent' not found");
  });
});
