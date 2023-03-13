import { createSlice } from '@reduxjs/toolkit'

const initialState = null
const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification(state, action) {
      return action.payload
    },

    hideNotification(state, action) {
      return null
    }
  }
})

export const { showNotification, hideNotification } = notificationSlice.actions

export const setNotification = (message, color, time) => {
  return async (dispatch) => {
    dispatch(showNotification({ message: message, color: color }))
    setTimeout(() => {
      dispatch(hideNotification())
    }, time * 1000)
  }
}

export default notificationSlice.reducer
