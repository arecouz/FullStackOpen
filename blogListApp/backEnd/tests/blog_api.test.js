const { test, after, beforeEach, describe } = require('node:test');
const Blog = require('../models/blog');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const assert = require('node:assert');
const helper = require('./blog_api_helper');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

describe('GET', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('all notes are returned', async () => {
    const response = await api.get('/api/blogs');
    assert.strictEqual(response.body.length, helper.initialBlogs.length);
  });

  test('the unique identifier is named: id', async () => {
    const response = await api.get('/api/blogs');
    assert.ok(response.body[0].id);
  });
});

describe('POST', () => {
  test('able to post a new blog', async () => {
    const newBlog = {
      title: 'a New Blog',
      author: 'a New Author',
      url: 'a New URL',
      likes: 0,
    };
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const notesAtEnd = await helper.blogsInDB();
    assert.strictEqual(notesAtEnd.length, helper.initialBlogs.length + 1);
  });

  test('when posting without likes field, default value 0 is used', async () => {
    const newBlog = {
      title: 'This Blog Has No Likes Field',
      author: 'a New Author',
      url: 'a New URL',
    };
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const notesAtEnd = await helper.blogsInDB();
    likes = notesAtEnd[helper.initialBlogs.length].likes;
    assert.strictEqual(0, likes);
  });

  test('posting without title field responds with 404', async () => {
    const newBlog = {
      author: 'this blog has no title',
      url: 'a New URL',
      likes: 0,
    };
    await api.post('/api/blogs').send(newBlog).expect(404);
  });
});

describe('DELETE', () => {
  test('deleting a blog removes it from DB and returns 204', async () => {
    const blogsInDb = await helper.blogsInDB();
    const blogToDelete = blogsInDb[0];
    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const blogsAtEnd = await helper.blogsInDB();
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1);

    const IDs = blogsAtEnd.map((blog) => blog.id);
    assert(!IDs.includes(blogToDelete.id));
  });
});
describe('PUT', () => {
  test('updating a blog post (likes)', async () => {
    const blogsInDB = await helper.blogsInDB();
    const blogToUpdate = blogsInDB[0];

    const response = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send({ likes: blogToUpdate.likes + 1 })
      .expect(201);

    assert.strictEqual(response.body.likes, blogToUpdate.likes + 1)
  });
});

after(async () => {
  await mongoose.connection.close();
});
