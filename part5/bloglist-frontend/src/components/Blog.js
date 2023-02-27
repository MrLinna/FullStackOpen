import { useState } from "react"
const Blog = ({blog, handleLike}) => {


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
            <button onClick={()=>setVisible(true)}>view</button>
          </div>
      </div>
    }
    {(visible) && 
      <div style={blogStyle}>
          <div> 
            {blog.title} {blog.author}
            <button onClick={()=>setVisible(false)}>hide</button>
          </div>
          <div>
            {blog.url}
          </div>
          <div>
            likes {blog.likes} <button onClick={()=>handleLike(blog.id)}>like</button>
          </div>
          <div>
            {blog.user.name}
          </div>
      </div>
    }
    
    
    </>

)}

export default Blog
