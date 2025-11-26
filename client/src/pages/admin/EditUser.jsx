/**
 * EditUser page
 * For Admin to edit an existing user
 *
 */
// react modules
import { useState } from 'react'
import { useParams } from 'react-router-dom'
// redux modules
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from '../../slices/users/userThunks'
import { selectUserById } from '../../slices/users/userSlice'
// local components & utilities
import { is_Empty } from '../../util/validation'
import BgCard from '../../components/common/BgCard'
import UserForm from '../../components/features/forms/UserForm'
import adminService from '../../services/adminService'

function EditUser() {
  const defaultImage = './public/Portrait_Placeholder.png'
  // Get users id
  const { id } = useParams();
  const paramId = Number(id);
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

  // onChange event handler
  const handleChange = (e) => {
    const { name, type, value, checked, files } = e.target

    setFormData((prev) => ({
      ...prev,
      // Checking value type before setting formData
      [name]: type === "checkbox" ? checked :
      type === "file" ? files[0] : value
    }))
  }

  // onSubmit event handler
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    // ADD VALIDATION
    // TBD

    console.log('Updating user...')

    try {
      const fileData = new FormData()
      let url = defaultImage
      // Uploading image if present
      if(image !== "") {
        fileData.append('file', image)
        const res = await adminService.uploadImage((fileData))
        if(res?.path) url = res.path
      }
      console.log(`default: ${defaultImage}, image: ${image}, url: ${url}`)
      // Send updated user
      dispatch(updateUser({
        id: paramId,
        data: {
          firstName,
          lastName,
          email,
          image: url,
          password,
          isAdmin } })).unwrap()
    } catch (error) {
      console.log('Error: ', error.message)
      // return
    } finally {
      setTimeout(() => {setLoading(false)}, 1000)
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
