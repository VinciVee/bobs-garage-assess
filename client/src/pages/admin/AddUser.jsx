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
  const defaultImage = './public/Portrait_Placeholder.png'
  // Hooks
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

    console.log('Adding new User...')

    // DISPATCH USER
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
      // Send user
      dispatch(addUser({
        firstName,
        lastName,
        email,
        image: url,
        password,
        isAdmin })).unwrap()
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
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        loading={loading}
      />
    </BgCard>
  )
}

export default AddUser
