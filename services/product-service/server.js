const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

const users = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' }
];

app.get('/api/users', (req, res) => res.json(users));
app.get('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  user ? res.json(user) : res.status(404).json({ message: 'User not found' });
});
app.get('/health', (req, res) => res.status(200).send('User Service is healthy ✅'));

app.listen(PORT, () => console.log(`🚀 User Service running on port ${PORT}`));
module.exports = app; // for testing
