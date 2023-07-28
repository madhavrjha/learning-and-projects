const { applyMiddleware, createStore, combineReducers, bindActionCreators } = require("redux");
const { logger } = require('redux-logger');
const thunkMiddleware = require('redux-thunk').default

// Actions 

const CAKE_ORDERED = 'CAKE_ORDERED';
const ICECREAM_ORDERED = 'ICECREAM_ORDERED'
const CAKE_RESTOCKED = 'CAKE_RESTOCKED'
const ICECREAM_RESTOCKED = 'ICECREAM_RESTOCKED'
const FETCH_USERS_REQUESTED = 'FETCH_USERS_REQUESTED'
const FETCH_USERS_SUCCEEDED = 'FETCH_USERS_SUCCEEDED'
const FETCH_USERS_FAILED = 'FETCH_USERS_FAILED'

// Action Creators 

const orderCake = () => {
  return {
    type: CAKE_ORDERED,
    payload: 1
  }
}

const restockCake = (quantity) => {
  return {
    type: CAKE_RESTOCKED,
    payload: quantity
  }
}

const orderIcecream = () => {
  return {
    type: ICECREAM_ORDERED,
    payload: 1
  }
}

const restockIcecream = (quantity) => {
  return {
    type: ICECREAM_RESTOCKED,
    payload: quantity
  }
}

const usersRequest = () => {
  return {
    type: FETCH_USERS_REQUESTED,
  }
}

const usersSuccess = users => {
  return {
    type: FETCH_USERS_SUCCEEDED,
    payload: users
  }
}

const usersFailure = error => {
  return {
    type: FETCH_USERS_FAILED,
    payload: error
  }
}

const fetchUsers = () => {
  return dispatch => {
    dispatch(usersRequest())
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => {
        const userIds = users.map(user => user.id)
        dispatch(usersSuccess(userIds))
      })
      .catch(error => dispatch(usersFailure(error)))
  }
}

// Reducers

const cakeInitialState = {
  noOfCakes: 10
}

const cakeReducer = (state = cakeInitialState, action) => {
  switch (action.type) {
    case CAKE_ORDERED:
      return {
        ...state,
        noOfCakes: state.noOfCakes - action.payload
      }
    case CAKE_RESTOCKED:
      return {
        ...state,
        noOfCakes: state.noOfCakes + action.payload
      }
    default:
      return state
  }
}

const icecreamInitialState = {
  noOfIcecream: 10
}

const iceCreamReducer = (state = icecreamInitialState, action) => {
  switch (action.type) {
    case CAKE_ORDERED:
      return {
        ...state,
        noOfIcecream: state.noOfIcecream - action.payload
      }
    case CAKE_RESTOCKED:
      return {
        ...state,
        noOfIcecream: state.noOfIcecream + action.payload
      }
    default:
      return state
  }
}

const userInitialState = {
  loading: false,
  users: [],
  error: ''
}

const userReducer = (state = userInitialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUESTED:
      return {
        ...state,
        loading: true,
      }
    case FETCH_USERS_SUCCEEDED:
      return {
        loading: false,
        users: action.payload,
        error: ''
      }
    case FETCH_USERS_FAILED:
      return {
        loading: false,
        users: [],
        error: action.payload
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  cake: cakeReducer,
  icecream: iceCreamReducer,
  user: userReducer
})

// Store

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware, logger))

const actions = bindActionCreators({ orderCake, orderIcecream, restockCake, restockIcecream, fetchUsers }, store.dispatch)

actions.orderCake();
actions.orderCake();
actions.orderCake();
actions.orderIcecream();
actions.orderIcecream();
actions.orderIcecream();
actions.restockCake(3);
actions.restockIcecream(3);
actions.fetchUsers();
