// server.js
const express = require('express');
const app = express();
app.use(express.json()); // Middleware to parse JSON

// In-memory storage
let todos = [
	{ id: 1, name: 'Buy groceries', completed: false },
	{ id: 2, name: 'Finish homework', completed: true },
];

// Generate unique IDs
let nextId = 3;

//    ROUTES

//  1. CREATE a new To-Do
app.post('/todos', (req, res) => {
	const { name, completed } = req.body;

	if (!name) {
		return res.status(400).json({ message: 'Name is required' });
	}

	const newTodo = {
		id: nextId++,
		name,
		completed: completed || false,
	};

	todos.push(newTodo);
	res.status(201).json({ message: 'Todo created', data: newTodo });
});

//  2. READ all To-Dos (with optional search)
app.get('/todos', (req, res) => {
	const { search } = req.query;

	let results = todos;

	if (search) {
		const keyword = search.toLowerCase();
		results = todos.filter((todo) => todo.name.toLowerCase().includes(keyword));
	}

	res.json({ message: 'Todos fetched', data: results });
});

//  3. READ one To-Do by ID
app.get('/todos/:id', (req, res) => {
	const id = parseInt(req.params.id);
	const todo = todos.find((t) => t.id === id);

	if (!todo) {
		return res.status(404).json({ message: 'Todo not found' });
	}

	res.json({ message: 'Todo fetched', data: todo });
});

//  4. UPDATE a To-Do by ID
app.patch('/todos/:id', (req, res) => {
	const id = parseInt(req.params.id);
	const { name, completed } = req.body;

	const todo = todos.find((t) => t.id === id);
	if (!todo) {
		return res.status(404).json({ message: 'Todo not found' });
	}

	if (name) todo.name = name;
	if (completed !== undefined) todo.completed = completed;

	res.json({ message: 'Todo updated', data: todo });
});

//  5. DELETE a To-Do by ID
app.delete('/todos/:id', (req, res) => {
	const id = parseInt(req.params.id);
	const index = todos.findIndex((t) => t.id === id);

	if (index === -1) {
		return res.status(404).json({ message: 'Todo not found' });
	}

	todos.splice(index, 1);
	res.json({ message: 'Todo deleted successfully' });
});

//    SERVER START

const PORT = 8000;
app.listen(PORT, () => {
	console.log(`✅ Server running on http://localhost:${PORT}`);
});
