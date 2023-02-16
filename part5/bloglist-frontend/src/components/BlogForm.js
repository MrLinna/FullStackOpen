import Blog from "./Blog"
import CreateBlog from './CreateBlog'
import Notification from "./Notification"


const BlogForm =({blogs, setBlogs, user, setUser, notificationMsg, setNotificationMsg})=> {

  const logout = () => {
    window.localStorage.clear()
    setUser(null)
  }
    return (
      <div>
        <h2>blogs</h2>
        <Notification message={notificationMsg} msgColor = 'green'/>

        <p>
          {user.name} logged in
          <button onClick={logout}>logout</button>
        </p>
        <CreateBlog blogs = {blogs} setBlogs ={setBlogs} 
                    notificationMsg={notificationMsg}
                    setNotificationMsg = {setNotificationMsg}/>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )
  }
export default BlogForm