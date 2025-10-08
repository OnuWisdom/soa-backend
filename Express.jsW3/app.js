const express = require('express');
const todoRouter = require('./routes/todo');
const blogRouter = require('./routes/blogs');
const app = express();

const port = 8000;

// Middleware
// meaning: Middleware is a function that has access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle.

app.use(express.json()); // Telling the app to use json middleware and to accept json body
app.use('/api/v1', [todoRouter, blogRouter]); // Bringing the todoRoutes from its file
// app.use('/api/v1', [blogRouter]);   Can be placed on the same line above instead of double line

//! routes
app.get('/', (req, res) => {
	// res.send('Hello World!');
	res.json({ message: 'Hello World!' });
});

// Invalid routes error
app.use((req, res, next) => {
	res.status(404).json({
		status: false,
		message: 'Invalid route',
		method: req.method,
		url: req.url,
	});
});

// Start server
app.listen(port, () => {
	console.log(`Listening to request on http://localhost:${port}`);
});
