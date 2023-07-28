const { configureStore } = require("@reduxjs/toolkit");
const { logger } = require("redux-logger");
const cakeReducer = require('../features/cake/cakeSlice')
const userReducer = require('../features/user/userSlice')
const icecreamReducer = require('../features/icecream/icecreamSlice')

const store = configureStore({
  reducer: {
    cake: cakeReducer,
    icecream: icecreamReducer,
    user: userReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
})

module.exports = store