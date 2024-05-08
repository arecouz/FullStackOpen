const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  response.status(200).json(blogs);
});

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  response.status(200).json(blog);
});

blogsRouter.post('/', async (request, response) => {
  const { title, author, url, likes } = request.body;
  const newBlog = new Blog({ title, author, url, likes });
  try {
    const savedBlog = await newBlog.save();
    response.status(201).json(savedBlog);
  } catch {
    response.status(404).json('missing stuff');
  }
});

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id);
  response.status(204).end();
});

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body;

  const updatedBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  };

  await Blog.findByIdAndUpdate(request.params.id, body, { new: true });
  response.status(201).json(body);
});

module.exports = blogsRouter;
