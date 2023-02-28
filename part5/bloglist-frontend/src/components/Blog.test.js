import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'


describe('<Blog /> tests', () => {
  let container

  beforeEach(() => {
    const blog = {
      user: { username: 'MrLinna' },
      likes: 1,
      author: 'fullstackopen part5',
      title: 'exercise 5.13',
      url: 'http://localhost:3000'
    }
    const user = { username: 'MrLinna' }

    container = render(
      <Blog blog={blog} user = {user}/>
    ).container
  })


  test('exercise 5.13: renders only title and author', () => {
    const titleAndAuthor = screen.getByText('exercise 5.13 fullstackopen part5')
    expect(titleAndAuthor).toBeDefined()
    const div = container.querySelector('.infoInvisible')
    expect(div).not.toHaveStyle('display: none')
  })


/*
  test('exercise 5.14: renders also url and likes when show-button has been clicked', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)



    const div = container.querySelector('.infoVisible')
    expect(div).not.toHaveStyle('display: none')

  })*/
})
