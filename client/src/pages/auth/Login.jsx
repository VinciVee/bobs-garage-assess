import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import { login } from '../../slices/authSlice'
import { is_Empty } from '../../util/validation'

// React tools
import Spinner from "react-bootstrap/Spinner"
import { FloatingLabel, Form, Button } from "react-bootstrap"

// Local Modules
import * as styles from './Login.css'
import AuthForm from '../../components/common/AuthForm'
import CustomButton from '../../components/common/CustomButton'

function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [loading, setLoading ] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    errors: {}
  })

  const { email, password, errors } = formData

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
      setTimeout(() => {setLoading(false), 1000})
    }
  }

  return (
    <AuthForm title="Log in" authform>
      <Form onSubmit={handleSubmit}>
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

        {/* SUBMIT BUTTON */}
        <CustomButton loadingState={loading}>
          {loading ? <Spinner animation="border" variant="light" /> : 'Submit'}
        </CustomButton>
      </Form>
      <div className={styles.userNav}>
        <span>Not a member? &nbsp;
          <Link to="/register">Sign Up Here</Link>
        </span>
      </div>
    </AuthForm>
  )
}

export default Login
