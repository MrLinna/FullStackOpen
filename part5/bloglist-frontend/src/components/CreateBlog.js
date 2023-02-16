import { useState } from "react"
import blogService from "../services/blogs"
import Notification from './Notification'

const CreateBlog = ({blogs, setBlogs, notificationMsg, setNotificationMsg}) => {
    const [newTitle, setNewTitle] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [newUrl, setNewUrl] = useState('')

    const addNewBlog = (event) => {
        event.preventDefault()
        const blogObject = {
            title: newTitle,
            author: newAuthor,
            url: newUrl
        }

        blogService
            .create(blogObject)
            .then(returnedBlog => {
                setBlogs(blogs.concat(returnedBlog))
                setNotificationMsg(`a new blog ${newTitle} by ${newAuthor} added`)
                setTimeout(() => {
                    setNotificationMsg(null)
                }, 5000)
                setNewTitle('')
                setNewAuthor('')
                setNewUrl('')
            })
    }
    
    return(
        <>
        <h2>create new</h2>
        <form onSubmit={addNewBlog}>

            <div>
            title:
            <input
                type= "text"
                value= {newTitle}
                name= "title"
                onChange={({ target }) => setNewTitle(target.value)} />
            </div>

            <div>
            author:
            <input
                type= "text"
                value= {newAuthor}
                name= "author"
                onChange={({ target }) => setNewAuthor(target.value)} />
            </div>

            <div>
            url:
            <input
                type= "text"
                value= {newUrl}
                name= "url"
                onChange={({ target }) => setNewUrl(target.value)} />
            </div>
            
            <button type="submit">create</button>
        </form>
      </>

    )
}

export default CreateBlog