import { configureStore } from '@reduxjs/toolkit'
import cakeRudecer from '../features/cake/cakeSlice'
// import logger from 'redux-logger'
import icecreamReducer from '../features/icecream/icecreamSlice'
import userReducer from '../features/user/userSlice'

const store = configureStore({
	reducer: {
		cake: cakeRudecer,
		icecream: icecreamReducer,
		user: userReducer,
	},
	// middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
})

export default store
