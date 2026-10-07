const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

const products = [
  { id: 101, name: 'Laptop', price: 999 },
  { id: 102, name: 'Phone', price: 599 },
];

const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];

app.get('/api/products', (req, res) => res.json(products));

app.get('/api/users', (req, res) => res.json(users));

app.get('/api/users/:id', (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id, 10));
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  return res.json(user);
});

app.get('/health', (req, res) => res.status(200).json({ status: 'healthy', service: 'product-service' }));

app.listen(PORT, () => console.log(`Product Service running on port ${PORT}`));

module.exports = app;
