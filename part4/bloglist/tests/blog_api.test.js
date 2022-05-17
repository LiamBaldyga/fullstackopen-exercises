const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  for(let blog of helper.initalBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

test('get correct amount of blogs', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(2)
})

test('identifier named id', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body[0].id).toBeDefined()
})

test('a blog can be added', async () => {
  const newBlog = {
    title: 'cats',
    author: 'ben',
    url: 'google.com',
    likes: 5
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect (blogsAtEnd).toHaveLength(helper.initalBlogs.length + 1)

    const contents  = blogsAtEnd.map(b => b.title)
    expect(contents).toContain(
      'React patterns'
    )
})

test('a blog has likes', async () => {
  const newBlog = {
    title: 'cats',
    author: 'ben',
    url: 'google.com',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initalBlogs.length + 1)

  const likes = blogsAtEnd.map(b => b.likes)
  expect(likes[6]).toEqual(0)
})

test('can remove blog', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)
  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(helper.initalBlogs.length - 1)

  const contents  = blogsAtEnd.map(blog => blog.title)
  expect(contents).not.toContain(blogToDelete.title)
})

test('can update blog likes', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToUpdate = blogsAtStart[0]

  const newBlog = {
    ...blogToUpdate,
    likes: 10,
  }

  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(newBlog)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd[0]).toEqual(newBlog)
})

afterAll(() => {
  mongoose.connection.close()
})