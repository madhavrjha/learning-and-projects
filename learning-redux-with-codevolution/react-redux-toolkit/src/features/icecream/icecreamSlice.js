import { createSlice } from '@reduxjs/toolkit'
import { ordered as cakeOrdered } from '../cake/cakeSlice'

const initialState = {
  noOfIcecreams: 20,
}

const icecreamSlice = createSlice({
  name: 'icecream',
  initialState,
  reducers: {
    ordered: state => {
      state.noOfIcecreams--
    },
    restocked: (state, action) => {
      state.noOfIcecreams += action.payload
    },
  },
  extraReducers: builder => {
    builder.addCase(cakeOrdered, state => {
      state.noOfIcecreams--
    })
  },
})

export const { ordered, restocked } = icecreamSlice.actions
export default icecreamSlice.reducer
