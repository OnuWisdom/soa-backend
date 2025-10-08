const express = require('express');

const todoRouter = express.Router();

todoRouter.get('/todo', (req, res) => {
	// res.send('Hello World!');
	res.json({ status: true, data: {} });
});
todoRouter.post('/todo', (req, res) => {
	// res.send('Hello World!');
	let body = req.body;
	res.json({ status: true, msg: 'New Todo Added', data: body });
});
todoRouter.patch('/todo', (req, res) => {
	// res.send('Hello World!');
	let body = req.body;
	res.json({
		status: true,
		msg: `Todo with ID ${body.id} was updated`,
		data: body,
	});
});
todoRouter.delete('/todo', (req, res) => {
	// res.send('Hello World!');
	let body = req.body;
	res.json({
		status: true,
		msg: `Todo with ID ${body.id} was deleted`,
		data: body,
	});
});

module.exports = todoRouter;
