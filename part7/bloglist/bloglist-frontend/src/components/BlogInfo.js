import { Link } from 'react-router-dom'

const BlogInfo = ({ blogToShow, handleLike }) => {
  if (!blogToShow) {
    return null
  }
  console.log('comments:', blogToShow.comments)

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
      <h2>comments</h2>
      <ul>
        {blogToShow.comments.map((comment) => (
          <li key={Math.floor(Math.random() * 99999999)}>{comment}</li>
        ))}
      </ul>
    </div>
  )
}

export default BlogInfo
