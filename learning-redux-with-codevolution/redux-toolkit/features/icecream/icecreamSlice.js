const { createSlice } = require("@reduxjs/toolkit")

const initialState = {
  noOfIcecreams: 20
}

const icecreamSlice = createSlice({
  name: 'icecream',
  initialState,
  reducers: {
    ordered: (state) => {
      state.noOfIcecreams--
    },
    restocked: (state, action) => {
      state.noOfIcecreams += action.payload
    },
  },
  extraReducers: {
    ['cake/ordered']: (state, action) => {
      state.noOfIcecreams--
    }
  }
})

module.exports = icecreamSlice.reducer
module.exports.icecreamActions = icecreamSlice.actions