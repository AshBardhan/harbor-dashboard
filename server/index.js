require('dotenv').config();

const express = require('express');
const data = require('./data');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

// Determine the frontend URL based on the environment
const clientOrigin = process.env.CORS_ORIGIN || 'http://localhost:3001';

// Enable CORS with the correct origin based on the environment
app.use(
	cors({
		origin: clientOrigin,
	})
);

app.get('/api/testnets', (req, res) => {
	res.json({
		code: 200,
		data: data,
	});
});

app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
});
