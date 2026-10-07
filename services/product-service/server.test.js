const request = require('supertest');
const app = require('./server');

describe('product-service', () => {
  it('GET /health returns healthy', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('healthy');
  });

  it('GET /api/products returns a list', async () => {
    const res = await request(app).get('/api/products');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('GET /api/users does not 500 (regression: undefined users array)', async () => {
    const res = await request(app).get('/api/users');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('GET /api/users/:id 404s for unknown id', async () => {
    const res = await request(app).get('/api/users/9999');
    expect(res.statusCode).toBe(404);
  });
});
