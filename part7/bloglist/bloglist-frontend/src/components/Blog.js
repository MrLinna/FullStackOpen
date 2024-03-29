import { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Blog = ({ blog, handleLike, removeBlog, user }) => {
  const [visible, setVisible] = useState(false)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    backgroundColor: '#cbc4ff'
  }

  return (
    <div className="blog" style={blogStyle}>
      <div style={hideWhenVisible} className="infoInvisible">
        <Link to={`/blogs/${blog.id}`}>
          {blog.title} {blog.author}
        </Link>
        <button id="viewButton" onClick={() => setVisible(true)}>
          view
        </button>
      </div>
      <div style={showWhenVisible} className="infoVisible">
        <Link to={`/blogs/${blog.id}`}>
          {blog.title} {blog.author}
        </Link>
        <button onClick={() => setVisible(false)}>hide</button>
        <br />
        {blog.url}
        <br />
        Likes {blog.likes}
        <button id="likeButton" onClick={() => handleLike(blog.id)}>
          like
        </button>
        <br />
        {blog.user.name}
        <br />
        {user.username.toString() === blog.user.username.toString() ? (
          <button id="remove-button" onClick={() => removeBlog(blog.id)}>
            remove
          </button>
        ) : (
          <></>
        )}
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog
