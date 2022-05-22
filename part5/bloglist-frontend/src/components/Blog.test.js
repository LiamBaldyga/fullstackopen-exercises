// Make a test which checks that the component displaying a blog renders the blog's title and author, but does not render its url or number of likes by default.

// Add CSS-classes to the component to help the testing as necessary.

import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

test('displays title and author', () => {
  const blog = {
    title: 'how to walk',
    author: 'joe biden',
    url: 'www.twitter.com',
    likes: 10
  }

  render(<Blog blog={blog} />)

  const element = screen.getByText('how to walk joe biden')
  expect(element).toBeDefined()
})

test('displays likes and url after button click', async () => {
  const blog = {
    title: 'how to walk',
    author: 'joe biden',
    url: 'www.twitter.com',
    likes: 10,
    user: {
      username: 'novvy'
    }
  }

  const user = {
    username: 'novvy'
  }

  render(<Blog blog={blog} user={user}/>)

  const userE = userEvent.setup()
  const button = screen.getByText('view')
  await userE.click(button)

  const url = screen.getByText('www.twitter.com')
  const likes = screen.getByText(10)

  expect(url).toBeDefined()
  expect(likes).toBeDefined()
})

test('increase likes twice', async () => {
  const blog = {
    title: 'how to walk',
    author: 'joe biden',
    url: 'www.twitter.com',
    likes: 10,
    user: {
      username: 'novvy'
    }
  }

  const user = {
    username: 'novvy'
  }

  const mockHandler = jest.fn()

  render(<Blog blog={blog} user={user} update={mockHandler}/>)

  const userE = userEvent.setup()
  const viewButton = screen.getByText('view')
  await userE.click(viewButton)
  const likeButton = screen.getByText('like')
  await userE.click(likeButton)
  await userE.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})