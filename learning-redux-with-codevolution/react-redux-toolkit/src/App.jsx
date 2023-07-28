import React from 'react'
import CakeView from './features/cake/CakeView'
import IcecreamView from './features/icecream/IcecreamView'
import UserView from './features/user/UserView'

const App = () => {
	return (
		<div className='App'>
			<CakeView />
			<IcecreamView />
			<UserView />
		</div>
	)
}

export default App
