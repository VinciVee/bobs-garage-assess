import { useState } from "react"
import { Navigate, useNavigate } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import { getIsAuth } from "../../slices/auth/authSlice"
import { register } from "../../slices/auth/authThunks"
import { is_Empty } from "../../util/validation"
// React tools
import { toast } from 'react-toastify'
// Local Modules
import * as styles from './Register.css'
import RegisterForm from "../../components/features/forms/RegisterForm"

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

  if(isAuth) {
    return <Navigate to='/' />
  }

  const { firstName, lastName, email, image, password, passwordCompare,  errors } = formData

  const handleChange = (e) => setFormData({
    ...formData,
    [e.target.name]: e.target.value // form input name and value
  })

  // const canSave = (firstName !== '' && email != '' && email !== '') && registerStatus === 'idle'

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)

    // CLIENT-SIDE VALIDATION
    // First name
    if(is_Empty(firstName)) {
      setFormData({ ...formData, errors: { firstName: 'First name is required '}})
      return
    }
    // Last name
    if(is_Empty(lastName)) {
      setFormData({ ...formData, errors: { lastName: 'Last name is required '}})
      return
    }
    // Email
    if(is_Empty(email)) {
      setFormData({ ...formData, errors: { email: 'email is required '}})
      return
    }
    // Password
    if(is_Empty(password)) {
      setFormData({ ...formData, errors: { password: 'password is required '}})
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
      // setRegisterStatus('pending')
      dispatch(register({ firstName, lastName, email, image, password })).unwrap()
      navigate('/')
    } catch (error) {
      console.log('Error: ', error.message)
      setTimeout(() => {setLoading(false), 1000})
      return
    } finally {
      setRegisterStatus('idle')
    }
  }

  return (
    <RegisterForm
      formData={formData}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      loading={loading}
    />
  )
}

export default Register
