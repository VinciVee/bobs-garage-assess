// react modules
import { Fragment, useState } from 'react'
import { useDispatch } from 'react-redux'
// react-bootstrap
import { FloatingLabel, Form, Button } from "react-bootstrap"
import Spinner from "react-bootstrap/Spinner"
// Slice
import { addUser } from '../../slices/users/userThunks'
// local components & utilities
import { is_Empty } from '../../util/validation'
import BgCard from '../../components/common/BgCard'
import BgButton from "../../components/common/BgButton"

function AddUser() {
  const [loading, setLoading ] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    image: '',
    password: '',
    passwordCompare: '',
    errors: {}
  })
  const [registerStatus, setRegisterStatus] = useState('idle')
  const dispatch = useDispatch()

  const { firstName, lastName, email, image, password, passwordCompare,  errors } = formData

  const handleChange = (e) => setFormData({
    ...formData,
    [e.target.name]: e.target.value // form input name and value
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Add new User - submit running...')

    // ADD VALIDATION
  }

  try {
    console.log('Saving new user...')
    setRegisterStatus('pending')
    dispatch(addUser({ firstName, lastName, email, image, password })).unwrap()
  } catch (error) {
    console.log('Error: ', error.message)
    return
  } finally {
    setRegisterStatus('idle')
  }

  return (
    <BgCard title="Add in new user" authform>
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
              onChange={handleChange}
              value={passwordCompare}
              className={`form-control ${errors.passwordCompare ? "is-invalid": "is-valid"}`}
              placeholder="Password Confirmation"
            />
        </FloatingLabel>
        { errors.passwordCompare && <div className='invalid-feedback'>
          { errors.passwordCompare}
          </div>}

        {/* SUBMIT BUTTON */}
        <BgButton loadingState={loading}>
          {loading ? <Spinner animation="border" variant="light" /> : 'Submit'}
        </BgButton>
      </Form>
    </BgCard>
  )
}

export default AddUser
