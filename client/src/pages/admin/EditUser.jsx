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
import adminService from '../../services/adminService'

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
  let imageFile = '';

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
  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    const defaultImage = './public/Portrait_Placeholder.png'

    // ADD VALIDATION
    // TBD

    console.log('Updating user...')

    try {
      // Getting image URL if present
      const fileData = new FormData()
      if(imageFile) {
        fileData.append('file', imageFile)
        const res = adminService.uploadImage((fileData))
        const url = res? res.path : defaultImage
        setFormData({...formData, image: url})
      }
      // Send updated user
      dispatch(updateUser({
        id: paramId,
        data: {
          firstName,
          lastName,
          email,
          image,
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
        imageFile={imageFile}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        loading={loading}
      />
    </BgCard>
  )
}

export default EditUser
