import { Link } from 'react-router-dom'

const BlogInfo = ({ blogToShow, handleLike }) => {
  return (
    <div>
      <h2>
        {blogToShow.title} {blogToShow.author}
      </h2>
      <Link to={blogToShow.url}>{blogToShow.url}</Link>
      <br />
      Likes {blogToShow.likes}
      <button id="likeButton" onClick={() => handleLike(blogToShow.id)}>
        like
      </button>
      <br />
      added by {blogToShow.user.name}
      <br />
    </div>
  )
}

export default BlogInfo
