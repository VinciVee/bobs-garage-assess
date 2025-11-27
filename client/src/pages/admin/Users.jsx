// Users page
// Handles loading, failed and succeeded states
// Calls UsersList component

import UsersList from '../../components/features/users/UsersList'
import { useSelector } from 'react-redux'
import { getUserError, getUserStatus, selectAllUsers } from '../../slices/users/userSlice'
import { useEffect } from 'react'

function Users() {
  const status = useSelector(getUserStatus)
  const error = useSelector(getUserError)
  console.log('Users.jsx - loading users')

  let content;

  switch (status) {
    case 'loading':
      console.log('Loading users...')
      content = ( <p>Loading...</p> )
      break

    case 'failed':
      console.log('Error: failed to load users...')
      content = (
        <div className='text-danger'>
          <p>{error}</p>
        </div>
      )
      break

    case 'succeeded':
      content = (
        <div>
          <UsersList />
        </div>
      )
      break

    default:
      console.log('Default case for usersList status - Users.jsx')
  }

  return (
    <>
      <h2>Users List</h2>
      <div className="row">
        { content }
      </div>
    </>
  )
}

export default Users
