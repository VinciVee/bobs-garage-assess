// Redux modules
import { useDispatch, useSelector } from "react-redux"
import { getIsAuth } from "../../slices/auth/authSlice"
import { register } from "../../slices/auth/authThunks"
import { is_Empty } from "../../util/validation"
// React* tools
import { useState } from "react"
import { Navigate, useNavigate } from "react-router"
import { ToastContainer, toast } from "react-toastify"
// Local Modules
import * as styles from './Register.css'
import RegisterForm from "../../components/features/forms/RegisterForm"
import adminService from "../../services/adminService"

function Register() {
  const defaultImage = './public/Portrait_Placeholder.png'
  // Hooks
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
    isAdmin: false,
    errors: {},
  })
  const dispatch = useDispatch()
  const isAuth = useSelector(getIsAuth)

  if(isAuth) {
    const toastNotify = () => {
      toast('User already logged-in. Redirecting...', {
        position: "top-center",
        autoClose: 2000,
        theme: "light",
      })
    }
    setTimeout(() => { return <Navigate to='/' /> }, 2000)
  }

  const { firstName, lastName, email, image, password, passwordCompare, isAdmin, errors } = formData

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
  const handleSubmit = async(e) => {
    e.preventDefault()
    setLoading(true)

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
    if(is_Empty(image)){
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
      const fileData = new FormData()
      let url = defaultImage
      // Uploading image if present
      if(image !== "") {
        fileData.append('file', image)
        const res = await adminService.uploadImage((fileData))
        if(res?.path) url = res.path
      }
      console.log(`default: ${defaultImage}, image: ${image}, url: ${url}`)
      // setRegisterStatus('pending')
      dispatch(register({
        firstName,
        lastName,
        email,
        image: url,
        password,
        isAdmin })).unwrap()
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
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        loading={loading}
      />
    </>
  )
}

export default Register
