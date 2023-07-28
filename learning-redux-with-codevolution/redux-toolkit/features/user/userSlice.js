const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit")

const initialState = {
  loading: false,
  users: [],
  error: ''
}

const fetchUsers = createAsyncThunk('user/requested', async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users')
  const data = await response.json()
  return data.map(user => user.id)
})

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.pending = true
    })
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.pending = false
      state.error = ''
      state.users = action.payload
    })
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message
      state.users = []
    })
  }
})

module.exports = userSlice.reducer
module.exports.fetchUsers = fetchUsers