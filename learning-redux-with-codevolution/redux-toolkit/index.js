const store = require("./app/store");
const { cakeActions } = require("./features/cake/cakeSlice");
const { fetchUsers } = require("./features/user/userSlice");

// store.dispatch(cakeActions.ordered())
// store.dispatch(cakeActions.ordered())
// store.dispatch(cakeActions.restocked(2))

store.dispatch(fetchUsers())

