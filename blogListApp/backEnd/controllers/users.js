const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.get('/', async (request, response) => {
  const users = await User.find({});
  response.status(200).json(users);
});

usersRouter.post('/', async (request, response) => {
  const { username, password } = request.body;
  const newUser = new User({ username, password });
    const savedUser = await newUser.save();
    response.status(201).json(savedUser);
});

module.exports = usersRouter;
