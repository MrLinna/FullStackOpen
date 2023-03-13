import { createSlice } from '@reduxjs/toolkit'
import { setNotification } from './notificationReducer'
import loginService from '../services/login'
import blogService from '../services/blogs'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    logout(state, action) {
      return null
    }
  }
})

export const { setUser, logout } = userSlice.actions

export const logOut = () => {
  return async (dispatch) => {
    dispatch(logout())
    window.localStorage.clear()
    dispatch(setNotification('Successfully logged out', 'green', 5))
  }
}

export const login = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({
        username,
        password
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setUser(user))
    } catch (error) {
      dispatch(setNotification('wrong username or password', 'red', 5))
    }
  }
}

export default userSlice.reducer
