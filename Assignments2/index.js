const express = require('express');
const app = express();

app.get('/hello', (req, res) => {
	res.json({ status: true, msg: 'Hello there! Welcome to my Express app ' });
});

app.get('/greet/:name', (req, res) => {
	const name = req.params.name;
	res.json({ status: true, msg: `Hello, ${name}!` });
});

// Start server
const PORT = 8000;
app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
