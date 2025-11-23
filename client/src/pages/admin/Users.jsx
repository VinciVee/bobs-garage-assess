// import useSelector
import { useSelector } from "react-redux"
// import selectAllUsers
import { selectAllUsers } from '../../slices/users/userSlice'
import SingleUser from './SingleUser'

function Users() {
  // Using the selector
  const userList = useSelector(selectAllUsers)
  return (
    <div className="m-3">
      <div className="card card-body mb-3 table-responsive">
        <h2 className="text-primary">User Table</h2>
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
                <SingleUser key={user.id} user={user} />
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Users
