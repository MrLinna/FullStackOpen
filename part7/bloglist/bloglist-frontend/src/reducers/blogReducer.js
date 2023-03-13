import { createSlice } from '@reduxjs/toolkit'
import { setNotification } from './notificationReducer'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blog',
  initialState: [],
  reducers: {
    createBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
    deleteBlog(state, action) {
      const ID = action.payload
      return state.filter((blog) => blog.id !== ID)
    },
    giveLikeToBlog(state, action) {
      const likedBlog = action.payload.blog
      const ID = action.payload.id
      return state
        .map((blog) => (blog.id === ID ? likedBlog : blog))
        .sort((a, b) => b.likes - a.likes)
    }
  }
})

export const { createBlog, setBlogs, deleteBlog, giveLikeToBlog } =
  blogSlice.actions

export const createNewBlog = (blogObject) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blogObject)
    dispatch(createBlog(newBlog))
    dispatch(
      setNotification(
        `a new blog ${newBlog.title} by ${newBlog.author} added`,
        'green',
        5
      )
    )
  }
}

export const likeBlog = (blogToLike) => {
  return async (dispatch) => {
    const likedBlog = { ...blogToLike, likes: blogToLike.likes + 1 }
    const updatedBlog = await blogService.update(blogToLike.id, likedBlog)
    dispatch(giveLikeToBlog({ blog: updatedBlog, id: blogToLike.id }))
  }
}

export const removeBlog = (blogToDelete) => {
  return async (dispatch) => {
    try {
      await blogService.remove(blogToDelete.id)
      dispatch(deleteBlog(blogToDelete.id))
      dispatch(setNotification('blog deleted successfully', 'green', 5))
    } catch (error) {
      dispatch(
        setNotification('Something went wrong while deleting blog.', 'red', 5)
      )
    }
  }
}
export default blogSlice.reducer
