import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('<BlogForm /> tests', () => {
  test('exercise 5.16: form calls the event handler it received as props with the right details when a new blog is created', async () => {
    const user = userEvent.setup()
    const mockHandler = jest.fn()

    render(<BlogForm CreateBlog={mockHandler} />)

    const button = screen.getByText('create')

    const titleInput = screen.getByPlaceholderText('write title here')
    const authorInput = screen.getByPlaceholderText('write author here')
    const urlInput = screen.getByPlaceholderText('write url here')

    await user.type(titleInput, 'Test Title')
    await user.type(authorInput, 'test author')
    await user.type(urlInput, 'test url')
    await act(() => {
      button.click(button)
    })
    expect(mockHandler.mock.calls).toHaveLength(1)
    expect(mockHandler.mock.calls[0][0].title).toBe('Test Title')
    expect(mockHandler.mock.calls[0][0].author).toBe('test author')
    expect(mockHandler.mock.calls[0][0].url).toBe('test url')
  })
})
