// Import icons & Link
import { FaTimes, FaPencilAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'

function UserItem({user, handleDelete}) {

  return (
    <tr>
      <td>{user.id}</td>
      <td>{user.firstName}</td>
      <td>{user.lastName}</td>
      <td>{user.email}</td>
      <td>{user.isAdmin ? 'Yes' : 'No'}</td>
      <td>{user.image}</td>
      <td>
        <Link to={`/admin/users-edit/${user.id}`} >
          <FaPencilAlt className='text-primary' style={{ cursor: 'pointer'}} />
        </Link>
      </td>
      <td>
        <FaTimes
          onClick={(e) => handleDelete(user.id, e)}
          style={{ cursor: 'pointer', color: 'red', marginLeft: '10px' }}
        />
      </td>
    </tr>

  )
}

export default UserItem
