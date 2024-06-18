const resetRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

resetRouter.post('/', async (request, response) => {
  console.log('Rest hit');
  await User.deleteMany({});
  await Blog.deleteMany({});
  response.status(204).end();
});


module.exports = resetRouter;
