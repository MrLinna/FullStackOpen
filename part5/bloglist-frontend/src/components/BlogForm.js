import Blog from "./Blog"
import CreateBlog from './CreateBlog'
const BlogForm =({blogs, setBlogs, user, setUser})=> {
  const logout = () => {
    window.localStorage.clear()
    setUser(null)
  }
    return (
      <div>
        <h2>blogs</h2>
        <p>
          {user.name} logged in
          <button onClick={logout}>logout</button>
        </p>
        <CreateBlog blogs = {blogs} setBlogs ={setBlogs}/>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )
  }
export default BlogForm