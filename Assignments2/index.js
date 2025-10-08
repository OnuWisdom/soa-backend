// server.js
const express = require('express');
const app = express();

// Route 1: /hello → returns greeting
app.get('/hello', (req, res) => {
	res.json({ status: true, msg: 'Hello there! Welcome to my Express app ' });
});

// Route 2: /greet/:name → returns “Hello, [name]”
app.get('/greet/:name', (req, res) => {
	const name = req.params.name; // get name from URL
	res.json({ status: true, msg: `Hello, ${name}!` });
});

// Start server
const PORT = 8000;
app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
