import { useState } from 'react'
import { Link } from 'react-router-dom'
import blogService from '../services/blogs'

const BlogInfo = ({ blogToShow, handleLike }) => {
  const [newComment, setNewComment] = useState('')
  const [addedComments, setAddedComments] = useState([])

  if (!blogToShow) {
    return null
  }

  const handleComment = async () => {
    if (newComment.length > 0) {
      const updDatedBlog = {
        ...blogToShow,
        comments: blogToShow.comments.concat(newComment)
      }
      await blogService.updateComment(blogToShow.id, updDatedBlog)
      setAddedComments(addedComments.concat(newComment))
      setNewComment('')
    }
  }

  const handleCommentChange = (event) => {
    setNewComment(event.target.value)
  }

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
      <input value={newComment} onChange={handleCommentChange}></input>
      <button id="commentButton" onClick={() => handleComment()}>
        add comment
      </button>
      <ul>
        {blogToShow.comments.map((comment) => (
          <li key={Math.floor(Math.random() * 99999999)}>{comment}</li>
        ))}
        {addedComments.length > 0
          ? addedComments.map((comment) => (
              <li key={Math.floor(Math.random() * 99999999)}>{comment}</li>
            ))
          : null}
      </ul>
    </div>
  )
}

export default BlogInfo
