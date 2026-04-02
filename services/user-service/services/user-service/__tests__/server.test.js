const request = require('supertest');
const app = require('../server');

test('GET /api/users returns list of users', async () => {
  const res = await request(app).get('/api/users');
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(2);
});
