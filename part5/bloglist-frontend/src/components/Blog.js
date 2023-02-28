import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleLike, removeBlog, user }) => {


  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  return (
    <>
      {(!visible) &&
      <div style={blogStyle}>
        <div>
          {blog.title} {blog.author}
          <button onClick={() => setVisible(true)}>view</button>
        </div>
      </div>
      }
      {(visible) &&
      <div style={blogStyle}>
        <div>
          {blog.title} {blog.author}
          <button onClick={() => setVisible(false)}>hide</button>
        </div>
        <div>
          {blog.url}
        </div>
        <div>
            likes {blog.likes} <button onClick={ () => handleLike(blog.id) }>like</button>
        </div>
        <div>
          {blog.user.name}
        </div>
        <div>
          {user.username.toString() === blog.user.username.toString()
            ? <button onClick={ () => removeBlog(blog.id) }>remove</button>
            : null
          }
        </div>
      </div>
      }
    </>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
}

export default Blog
