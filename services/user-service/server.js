const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const users = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' },
];

app.get('/api/users', (req, res) => res.json(users));

app.get('/api/users/:id', (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id, 10));
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  return res.json(user);
});

app.get('/health', (req, res) =>
  res.status(200).json({ status: 'healthy', service: 'user-service' })
);

if (require.main === module) {
  app.listen(PORT, () => console.log(`User Service running on port ${PORT}`));
}

module.exports = app;
