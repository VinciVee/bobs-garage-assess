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
    image: '',
    password: '',
    passwordCompare: '',
    isAdmin: false,
    errors: {}
  })

  const { firstName, lastName, email, image, password, passwordCompare, isAdmin, errors } = formData
  let imageFile = '';

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

    console.log('Add new User - submitting...')

    // ADD VALIDATION
    try {
      // Getting image URL if present
      const fileData = new FormData()
      if(imageFile) {
        fileData.append('file', imageFile)
        const res = adminService.uploadImage((fileData))
        const url = res? res.path : defaultImage
        setFormData({...formData, image: url})
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
      setTimeout(() => {setLoading(false)}, 1000)
    }
  }

  return (
    <BgCard title="Add in new user" authform>
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

export default AddUser
