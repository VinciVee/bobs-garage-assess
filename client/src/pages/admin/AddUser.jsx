// react modules
import { useState } from 'react'
import { useDispatch } from 'react-redux'
// redux modules
import { addUser } from '../../slices/users/userThunks'
// local components & utilities
import { is_Empty } from '../../util/validation'
import adminService from '../../services/adminService'
import BgCard from '../../components/common/BgCard'
import UserForm from '../../components/features/forms/UserForm'

function AddUser() {
  const dispatch = useDispatch()
  // States
  const [loading, setLoading ] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    imageFile: null,
    password: '',
    passwordCompare: '',
    isAdmin: false,
    errors: {}
  })

  const { firstName, lastName, email, imageFile, password, passwordCompare, isAdmin, errors } = formData

  // onChange
  const handleChange = (e) => {
    const { name, type, value, checked, files } = e.target

    setFormData((prev) => ({
      ...prev,
      // Checking value type before setting formData
      [name]: type === "checkbox" ? checked :
      type === "file" ? files[0] : value
    }))
  }

  const defaultImage = './public/Portrait_Placeholder.png'

  // onSubmit
  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    console.log('Add new User - submitting...')

    // ADD VALIDATION
    try {
      // Getting image URL if present
      let image = defaultImage
      const fileData = new FormData()
      if(fileData) {
        fileData.append('file', imageFile)
        const res = adminService.uploadImage((fileData))
        image = res.path
      }
      // Send user
      dispatch(addUser({
        firstName,
        lastName,
        email,
        image,
        password })).unwrap()
    } catch (error) {
      console.log('Error: ', error.message)
      // return
    } finally {
      setTimeout(() => {setLoading(false), 1000})
    }
  }

  return (
    <BgCard title="Add in new user" authform>
      <UserForm
        formData={formData}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        loading={loading}
      />
    </BgCard>
  )
}

export default AddUser
