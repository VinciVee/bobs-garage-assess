import { useState } from "react"
import { Link, Navigate, useNavigate } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import { register, getIsAuth } from "../../slices/authSlice"
import { is_Empty } from "../../util/validation"

// React tools
import { FloatingLabel, Form, Button } from "react-bootstrap"
import Spinner from "react-bootstrap/Spinner"
import { toast } from 'react-toastify'

// Local Modules
import * as styles from './Register.css'
import AuthForm from '../../components/common/AuthForm'
import CustomButton from "../../components/common/CustomButton"

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
      console.log('Error: ', error)
      setTimeout(() => {setLoading(false), 1000})
    } finally {
      setRegisterStatus('idle')
    }
  }

  return (
    <AuthForm title="Sign Up" authform>
      <Form onSubmit={handleSubmit}>
        {/* FIRSTNAME */}
        <FloatingLabel
          controlId="firstName"
          label="First name*"
          className="mb-3" >
            <Form.Control
              type="text"
              className={`form-control ${errors.firstName ? "is-invalid": "is-valid"}`}
              placeholder="First name"
              name="firstName"
              onChange={handleChange}
              value={firstName} />
        </FloatingLabel>
        { errors.firstName && <div className='invalid-feedback'>
          { errors.firstName}
          </div>}

        {/* LASTNAME */}
        <FloatingLabel
          controlId="lastName"
          label="Last name*"
          className="mb-3" >
            <Form.Control
              type="text"
              className={`form-control ${errors.lastName ? "is-invalid": "is-valid"}`}
              placeholder="Last name"
              name="lastName"
              onChange={handleChange}
              value={lastName} />
        </FloatingLabel>
        { errors.lastName && <div className='invalid-feedback'>
          { errors.lastName}
          </div>}

        {/* EMAIL */}
        <FloatingLabel
          controlId="email"
          label="Email address*"
          className="mb-3" >
            <Form.Control
              type="email"
              className={`form-control ${errors.email ? "is-invalid": "is-valid"}`}
              placeholder="name@example.com"
              name="email"
              onChange={handleChange}
              value={email} />
        </FloatingLabel>
        { errors.email && <div className='invalid-feedback'>
          { errors.email}
          </div>}

        {/* PASSWORD */}
        <FloatingLabel
          controlId="password"
          label="Password*"
          className="mb-3" >
            <Form.Control
              type="password"
              className={`form-control ${errors.password ? "is-invalid": "is-valid"}`}
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={password} />
        </FloatingLabel>
        { errors.password && <div className='invalid-feedback'>
          { errors.password}
          </div>}

        {/* PASSWORD CONFIRMATION */}
        <FloatingLabel
          controlId="password-confirm"
          label="Password Confirmation*"
          className="mb-3">
            <Form.Control
              type="password"
              name="passwordCompare"
              value={passwordCompare}
              className={`form-control ${errors.passwordCompare ? "is-invalid": "is-valid"}`}
              placeholder="Password Confirmation"
            />
        </FloatingLabel>
        { errors.passwordCompare && <div className='invalid-feedback'>
          { errors.passwordCompare}
          </div>}

        {/* SUBMIT BUTTON */}
        <CustomButton loadingState={loading}>
          {loading ? <Spinner animation="border" variant="light" /> : 'Submit'}
        </CustomButton>
      </Form>
      <div className={styles.userNav}>
        <span>Already a member? &nbsp;
          <Link to="/login">Login Here</Link>
        </span>
      </div>
    </AuthForm>
  )
}

export default Register
