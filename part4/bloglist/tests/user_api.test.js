const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')

const api = supertest(app)


describe('invalid users', () => {
  test('no username', async () => {
    const usersAtStart = await helper.usersInDb()
    
    const newUser = {
      name: 'ben',
      password: 'dogs'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('short username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'be',
      password: 'benn',
      name: 'ben'
    }

    await api
    .post('/api/users')
    .send(newUser)
    .expect(500)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('no password', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'benn',
      name: 'ben'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('short password', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'benn',
      password: 'be',
      name: 'ben'
    }

    await api
    .post('/api/users')
    .send(newUser)
    .expect(400)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })


})