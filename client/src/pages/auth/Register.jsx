// Redux modules
import { useDispatch, useSelector } from "react-redux"
import { getIsAuth } from "../../slices/auth/authSlice"
import { register } from "../../slices/auth/authThunks"
import { is_Empty } from "../../util/validation"
// React* tools
import { useState } from "react"
import { Navigate, useNavigate } from "react-router"
import { ToastContainer, toast } from 'react-toastify'
// Local Modules
import * as styles from './Register.css'
import RegisterForm from "../../components/features/forms/RegisterForm"
import adminService from "../../services/adminService"

function Register() {
  const navigate = useNavigate()
  const [loading, setLoading ] = useState(false)
  const [registerStatus, setRegisterStatus] = useState('idle')
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    image: '',
    password: '',
    passwordCompare: '',
    errors: {}
  })
  const dispatch = useDispatch()
  const isAuth = useSelector(getIsAuth)
  let imageFile = '';

  if(isAuth) {
    setTimeout(() => {
      toast('User already logged-in. Redirecting...', {
        position: "",
        autoClose: 2000,
        theme: "light",
      })
      return <Navigate to='/' />
    }, 2000)
  }

  const { firstName, lastName, email, image, password, passwordCompare,  errors } = formData

  // onChange event handler
  const handleChange = e => {
    const { name, type, value, checked, files } = e.target
    setFormData((prev) => ({
      ...prev,
      // Checking value type before setting formData
      [name]: type === "checkbox" ? checked :
      type === "file" ? files[0] : value
    }))
  }

  // const canSave = (firstName !== '' && email != '' && email !== '') && registerStatus === 'idle'
  // onSubmit event handler
  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    const defaultImage = './public/Portrait_Placeholder.png'

    // CLIENT-SIDE VALIDATION
    // First name
    if(is_Empty(firstName)) {
      setFormData({ ...formData, errors: { firstName: 'First name is required '}})
      setLoading(false)
      return
    }
    // Last name
    if(is_Empty(lastName)) {
      setFormData({ ...formData, errors: { lastName: 'Last name is required '}})
      setLoading(false)
      return
    }
    // Email
    if(is_Empty(email)) {
      setFormData({ ...formData, errors: { email: 'email is required '}})
      setLoading(false)
      return
    }
    // IMAGE
    if(is_Empty(imageFile)){
      console.log('Use default image')
      setFormData({ ...formData, image: defaultImage })
    }
    // Password
    if(is_Empty(password)) {
      setFormData({ ...formData, errors: { password: 'password is required '}})
      setLoading(false)
      return
    }
    // Password Comparisation
    if(is_Empty(passwordCompare)) {
      setFormData({ ...formData, errors: { passwordCompare: 'password is required '}})
      return
    }
    // Check if both passwords match
    if(password !== passwordCompare){
      // If password DOES NOT match passwordConf., trigger this
      setFormData({ ...formData, errors: { password: 'Passwords do not match' }})
      // toast.warn("Passwords do not match")
      setLoading(false)
      return
    }

    try {
      // Getting image URL if present
      const fileData = new FormData()
      if(imageFile) {
        fileData.append('file', imageFile)
        const res = adminService.uploadImage((fileData))
        const url = res? res.path : defaultImage
        setFormData({...formData, image: url})
      }
      // setRegisterStatus('pending')
      dispatch(register({
        firstName,
        lastName,
        email,
        image,
        password })).unwrap()
      setTimeout(() => {navigate('/')}, 1000)
    } catch (error) {
      console.log('Error: ', error.message)
    } finally {
      setTimeout(() => {setLoading(false)}, 1000)
      setRegisterStatus('idle')
    }
  }

  return (
    <>
      <ToastContainer />
      <RegisterForm
        formData={formData}
        imageFile={imageFile}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        loading={loading}
      />
    </>
  )
}

export default Register
