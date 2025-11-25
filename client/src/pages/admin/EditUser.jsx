/**
 * EditUser page
 * For Admin to edit an existing user
 *
 */
// react modules
import { useState, useParams } from 'react'
// redux modules
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from '../../slices/users/userThunks'
import { selectUserById } from '../../slices/users/userSlice'
// local components & utilities
import { is_Empty } from '../../util/validation'
import BgCard from '../../components/common/BgCard'
import UserForm from '../../components/features/forms/UserForm'

function EditUser() {
  // Get users details
  const paramId = Number(useParams().id)
  // Other hooks
  const dispatch = useDispatch()
  const user = useSelector((state) => selectUserById(state, paramId))
  // States
  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    image: user.image,
    password: user.password,
    passwordCompare: user.password,
    isAdmin: user.isAdmin,
    errors: {}
  })
  const [loading, setLoading ] = useState(false)

  // User properties
  const { firstName, lastName, email, image, password, passwordCompare, isAdmin, errors } = formData

  if(!user){
    return (
      <section className='text-danger'>
        <h2>User not found!</h2>
      </section>
    )
  }

  console.log(`EditUser.jsx id: ${paramId}`)
  // onChange
  const handleChange = (e) => {
    const { name, type, value, checked } = e.target

    setFormData((prev) => ({
      ...prev,
      // form input name and value
      [name]: type === "checkbox" ? checked : value
    }))
  }

  // onSubmit
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Add new User - submit running...')
    setLoading(true)

    // ADD VALIDATION

    // Updated User (values from deconstructed formData)
    const updUser = { firstName, lastName, email, image, password, isAdmin }

    try {
      console.log('Updating user...')
      dispatch(updateUser({ id: paramId, data: updUser })).unwrap()
    } catch (error) {
      console.log('Error: ', error.message)
      // return
    } finally {
      setTimeout(() => {setLoading(false), 1000})
    }
  }

  return (
    <BgCard title="Edit user" authform>
      <UserForm
        formData={formData}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        loading={loading}
      />
    </BgCard>
  )
}

export default EditUser
