const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
  const { title, author, url, likes } = request.body;
  const newBlog = new Blog({ title, author, url, likes });
  try {
    const savedBlog = await newBlog.save();
    response.status(201).json(savedBlog);
  } catch {
    response.status(404).json("missing stuff")
  }
});

module.exports = blogsRouter;
