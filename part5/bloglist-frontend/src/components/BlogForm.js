
import { useState } from 'react'

import Input from './Input'


const BlogForm = ({ CreateBlog }) => {

  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')


  const addBlog = (event) => {
    event.preventDefault()
    CreateBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    })

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')

  }

  return (
    <div>
      <h2>create new</h2>

      <form onSubmit={addBlog}>
        <Input
          text = "title: "
          value={newTitle}
          onChange={event => setNewTitle(event.target.value)}
        />
        <Input
          text = "author: "
          value={newAuthor}
          onChange={event => setNewAuthor(event.target.value)}
        />
        <Input
          text = "url: "
          value={newUrl}
          onChange={event => setNewUrl(event.target.value)}
        />
        <button type="submit">create</button>
      </form>
    </div>
  )
}


export default BlogForm