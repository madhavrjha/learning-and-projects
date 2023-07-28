import React, { useEffect } from 'react'
import { fetchUsers } from './userSlice'
import { useDispatch, useSelector } from 'react-redux'

const UserView = () => {
	const dispatch = useDispatch()
	const users = useSelector(state => state.user.users)
	const loading = useSelector(state => state.user.loading)
	const error = useSelector(state => state.user.error)

	useEffect(() => {
		dispatch(fetchUsers())
	}, [])

	return (
		<div>
			<h3>Users</h3>
			<table>
				<thead>
					<tr>
						<td>ID</td>
						<td>USER</td>
					</tr>
				</thead>
				<tbody>
					{loading && (
						<tr>
							<td colSpan={2}>Loading...</td>
						</tr>
					)}
					{error && (
						<tr>
							<td colSpan={2}>{error}</td>
						</tr>
					)}
					{Boolean(users.length) &&
						users.map(user => (
							<tr key={user.id}>
								<td>{user.id}</td>
								<td>{user.name}</td>
							</tr>
						))}
				</tbody>
			</table>
		</div>
	)
}

export default UserView
