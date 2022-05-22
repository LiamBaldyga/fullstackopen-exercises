import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('form calls event handler', async () => {
  const createBlog = jest.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlog} />)

  const inputs = screen.getAllByRole('textbox')
  const createButton = screen.getByText('create')

  await user.type(inputs[0], 'percy jackson')
  await user.type(inputs[1], 'rick riordan')
  await user.type(inputs[2], 'www.google.com')
  await user.click(createButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('percy jackson')
  expect(createBlog.mock.calls[0][0].author).toBe('rick riordan')
  expect(createBlog.mock.calls[0][0].url).toBe('www.google.com')
})
