import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getIsAuth } from '../../slices/auth/authSlice'
// Local Modules
import * as styles from './Login.css'
import { login } from '../../slices/auth/authThunks'
import { is_Empty } from '../../util/validation'
import LoginForm from '../../components/features/forms/LoginForm'
import { ToastContainer, toast } from 'react-bootstrap'

function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [loading, setLoading ] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    errors: {}
  })

  const isAuth = useSelector(getIsAuth)
  const { email, password } = formData

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


  // onChange event handler
  const handleChange = (e) => setFormData({
    ...formData,
    [e.target.name]: e.target.value // form input name and value
  })

  // onSubmit event handler
  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    // CLIENT-SIDE VALIDATION
    // Email
    if(is_Empty(email)) {
      setFormData({ ...formData, errors: { email: 'email is required '}})
      setLoading(false)
      return
    }
    // Password
    if(is_Empty(password)) {
      setFormData({ ...formData, errors: { password: 'password is required '}})
      setLoading(false)
      return
    }

    try {
      dispatch(login({ email, password }))
      setTimeout(() => {navigate('/')}, 1000)
    } catch (error) {
      console.log('error loggin in... -handleSubmit, Login.jsx')
    } finally {
      setTimeout(() => {setLoading(false)}, 1000)
    }
  }

  return (
    <>
      <ToastContainer />
      <LoginForm
        formData={formData}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        loading={loading}
      />
    </>
  )
}

export default Login
