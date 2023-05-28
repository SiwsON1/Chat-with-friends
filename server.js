const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'client')));

const messages = ['msg 1', 'msg 2', 'msg 3'];

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/index.html'));
  });

app.listen(9000, () => {
  console.log('Server is running on port: 8000');
});