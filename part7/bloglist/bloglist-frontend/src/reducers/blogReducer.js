import { createSlice } from '@reduxjs/toolkit'
import { setNotification } from './notificationReducer'

const blogSlice = createSlice({
  name: 'blog',
  initialState: [],
  reducers: {
    createBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    }
  }
})

export const { createBlog, setBlogs } = blogSlice.actions

export const createNewBlog = (newBlog) => {
  return async (dispatch) => {
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

export default blogSlice.reducer
