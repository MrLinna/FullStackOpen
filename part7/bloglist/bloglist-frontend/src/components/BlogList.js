import Togglable from './Togglable'
import BlogForm from './BlogForm'
import Blog from './Blog'
import { useSelector } from 'react-redux'

const BlogList = ({ addBlog, blogFormRef, handleLike, deleteBlog }) => {
  const user = useSelector((state) => state.user)
  const blogs = useSelector((state) => state.blogs)

  return (
    <>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm CreateBlog={addBlog} />
      </Togglable>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={handleLike}
          removeBlog={deleteBlog}
          user={user}
        />
      ))}
    </>
  )
}

export default BlogList
