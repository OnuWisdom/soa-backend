const express = require('express');
const app = express();

const port = 8000;

// Middleware
// meaning: Middleware is a function that has access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle.
app.use(express.json());
// Telling the app to use json middleware and to accept json body

//! routes
app.get('/', (req, res) => {
	// res.send('Hello World!');
	res.json({ message: 'Hello World!' });
});
app.get('/todo', (req, res) => {
	// res.send('Hello World!');
	res.json({ status: true, data: {} });
});
app.post('/todo', (req, res) => {
	// res.send('Hello World!');
	let body = req.body;
	res.json({ status: true, mgs: 'New Todo Added', data: body });
});
app.patch('/todo', (req, res) => {
	// res.send('Hello World!');
	let body = req.body;
	res.json({
		status: true,
		msg: `Todo with ID ${body.id} was updated`,
		data: body,
	});
});
app.delete('/todo', (req, res) => {
	// res.send('Hello World!');
	let body = req.body;
	res.json({
		status: true,
		msg: `Todo with ID ${body.id} was deleted`,
		data: body,
	});
});

// Middleware
function onlyAdmin(req, res, next) {
	const { role } = req.body;
	if (role === 'Admin') {
		next();
	} else {
		res.status(403).json({
			status: false,
			message: 'You are not authorized',
		});
	}
}
// Blog routes
app.get('/blog', onlyAdmin, (req, res) => {
	let body = req.body;
	res.json({ status: false, data: body, message: 'Hello World!' });
});
app.post('/blog', onlyAdmin, (req, res) => {
	let body = req.body;
	res.json({ status: false, data: body, message: 'Hello World!' });
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
