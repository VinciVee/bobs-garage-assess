// import useSelector
import { useSelector, useDispatch } from "react-redux"
// import selectAllUsers
import { selectAllUsers } from '../../../slices/users/userSlice'
import { getIsAdmin, getIsAuth } from "../../../slices/auth/authSlice"
import { deleteUser } from "../../../slices/users/userThunks"
import { Navigate } from "react-router"
import UserItem from './UserItem'

function UsersList() {
  // Redux hooks
  const userList = useSelector(selectAllUsers)
  const dispatch = useDispatch()

  const handleDelete = (id, e) => {
    console.log('[UsersList] handleDelete: ', e.type);
    try {
      dispatch( deleteUser(id) ).unwrap()
      Navigate('/users')
    } catch (err) {
      console.log('Failed to delete user', err)
    }
  }

  return (
    <div className="m-3">
      <div className="card card-body mb-3 table-responsive">
        <h2 className="text-primary">Users Table</h2>
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Email</th>
              <th scope="col">Admin</th>
              <th scope="col">Image</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody className="table=group-divider">
            {
              userList.map((user) => (
                <UserItem
                  key={user.id}
                  user={user}
                  handleDelete={handleDelete}
                />
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UsersList
