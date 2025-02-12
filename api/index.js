require('dotenv').config();

const express = require('express');
const data  = require('./data'); 
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());  // Allow cross-origin requests

app.get("/api/testnets", (req, res) => {
  res.send({
    code: 200,
    data: data,
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

