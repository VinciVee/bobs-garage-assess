import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import { login } from '../../slices/auth/authThunks'
import { is_Empty } from '../../util/validation'
// Local Modules
import * as styles from './Login.css'
import LoginForm from '../../components/features/forms/LoginForm'

function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [loading, setLoading ] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    errors: {}
  })

  const { email, password } = formData

  const handleChange = (e) => setFormData({
    ...formData,
    [e.target.name]: e.target.value // form input name and value
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)

    // CLIENT-SIDE VALIDATION
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

    try {
      dispatch(login({ email, password }))
      navigate('/')
    } catch (error) {
      console.log('error loggin in... -handleSubmit, Login.jsx')
      setTimeout(() => {setLoading(false), 1000})
    }
  }

  return (
    <LoginForm
      formData={formData}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      loading={loading}
    />
  )
}

export default Login
