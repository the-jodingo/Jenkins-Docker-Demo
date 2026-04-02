const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

const products = [
  { id: 101, name: 'Laptop', price: 999 },
  { id: 102, name: 'Phone', price: 599 }
];

app.get('/api/products', (req, res) => res.json(products));

app.get('/api/users', (req, res) => res.json(users));
app.get('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  user ? res.json(user) : res.status(404).json({ message: 'User not found' });
});
app.get('/health', (req, res) => res.status(200).send('User Service is healthy ✅'));

app.listen(PORT, () => console.log(`🚀 User Service running on port ${PORT}`));
module.exports = app; // for testing
