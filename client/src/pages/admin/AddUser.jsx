// react modules
import { useState } from 'react'
import { useDispatch } from 'react-redux'
// redux modules
import { addUser } from '../../slices/users/userThunks'
// local components & utilities
import { is_Empty } from '../../util/validation'
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

  // onChange
  const handleChange = (e) => {
    const { name, type, value, checked } = e.target

    setFormData((prev) => ({
      ...prev,
      // form input name and value
      [name]: type === "checkbox" ? checked : value
    }))
  }

  // onSubmit
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Add new User - submit running...')

    // ADD VALIDATION
    try {
      console.log('Saving new user...')
      dispatch(addUser({ firstName, lastName, email, image, password })).unwrap()
    } catch (error) {
      console.log('Error: ', error.message)
      // return
    } finally {
      setTimeout(() => {setLoading(false), 1000})
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
