import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'


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
    const removeBlog = () => console.log('remove blog')
    const handleLike = () => console.log('handle like')

    container = render(
      <Blog blog={blog} user = {user} removeBlog = {removeBlog} handleLike = {handleLike}/>
    ).container
  })


  test('exercise 5.13: renders only title and author', () => {
    const titleAndAuthor = screen.getByText('exercise 5.13 fullstackopen part5')
    expect(titleAndAuthor).toBeDefined()
    const div = container.querySelector('.infoInvisible')
    expect(div).not.toHaveStyle('display: none')
  })



  test('exercise 5.14: renders also url and likes when show-button has been clicked', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const div = container.querySelector('.infoVisible')
    const titleAndAuthor = screen.getByText('exercise 5.13 fullstackopen part5')
    const url = screen.getByText('http://localhost:3000', { exact : false })
    const likes = screen.getByText('likes 1', { exact : false })

    expect(div).not.toHaveStyle('display: none')
    expect(titleAndAuthor).toBeDefined()
    expect(url).toBeDefined()
    expect(likes).toBeDefined()
  })
})
