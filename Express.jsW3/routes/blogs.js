const express = require('express');

const blogRouter = express.Router();

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

// In Memory array of objects
let blogs = [
	{
		id: 1,
		title: 'Hello World',
		content: 'This is a blog post',
	},
];

// Blog routes
blogRouter.get('/blog', (req, res) => {
	res.json({ status: true, data: blogs, message: 'Blog gotten!' });
});
blogRouter.get('/blog/:id', (req, res) => {
	let id = parseInt(req.params.id);
	// search for blogs with ID
	let blog = blogs.find((blog) => blog.id === id);
	if (blog) {
		res.json({ status: true, blog, message: 'Blog gotten!' });
	} else {
		res.status(404).json({ status: false, message: 'Blog not found!' });
	}
});
blogRouter.post('/blog', onlyAdmin, (req, res) => {
	let { title, content } = req.body;

	if (!title || !content) {
		res.status(404).json({ status: false, message: 'Add title or content!' });
	} else {
		let addBlog = { id: blogs.length + 1, title, content };
		blogs.push(addBlog);
		res.json({ status: true, data: addBlog, message: 'Blog created!' });
	}
});
blogRouter.patch('/blog/:id', onlyAdmin, (req, res) => {
	let { title, content } = req.body;
	let id = parseInt(req.params.id);

	let blogId = blogs.find((blog) => blog.id === id);
	if (blogId) {
		let blogIndex = blogs.findIndex((blog) => blog.id === id);

		let update = { ...blogId };
		if (title) update.title = title;
		if (content) update.content = content;
		blogs[blogIndex] = update;
		res.json(update);
	} else {
		res.status(404).json({ status: false, message: 'Blog not found!' });
	}
});
blogRouter.delete('/blog/:id', onlyAdmin, (req, res) => {
	const id = parseInt(req.params.id);

	if (isNaN(id)) {
		return res.status(400).json({ status: false, message: 'Invalid blog ID' });
	}

	const blogIndex = blogs.findIndex((blog) => blog.id === id);

	if (blogIndex) {
		// Remove blog from array
		blogs.splice(blogIndex, 1);
		res.json({ status: true, message: 'Blog deleted successfully!' });
	} else {
		res.status(404).json({ status: false, message: 'Blog not found!' });
	}
});

module.exports = blogRouter;
