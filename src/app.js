const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const app = express();

app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
