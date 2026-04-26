const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.json({ message: 'Hello from Jenkins pipeline 🚀' });
});

app.listen(3001, () => console.log('App running on port 3001'));