import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    isLoading: false,
    error: null,
  },
  reducers: {
    setAuth: (state, action) => {
      state.isAuthenticated = action.payload
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
    logout: state => {
      state.isAuthenticated = false
      localStorage.removeItem('basicToken')
    },
  },
})

export const { setAuth, setLoading, setError, logout } = authSlice.actions
export default authSlice.reducer
export { authSlice }
