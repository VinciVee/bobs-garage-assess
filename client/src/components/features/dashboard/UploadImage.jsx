import { useState } from 'react'
import adminService from '../../../services/adminService'
import { Form, Card } from 'react-bootstrap'
// Local modules
import InputField from '../../common/InputField'

function UploadImage({label, name, value, placeholder, error}) {
  const [ file, setFile ] = useState(null)
  const [ msg, setMsg ] = useState('')

  // onChange
  const handleChange = (e) => {
    const uploadedFile = e.target.files[0]
    console.log('Selected file:', uploadedFile)
    setFile(uploadedFile)
    setMsg('')
  }

  // onUpload
  const handleUpload = (e) => {
    e.preventDefault()
    // fileData os FormData object | key-value pair
    const fileData = new FormData()
    fileData.append('file', file)

    try {
      const res = adminService.uploadImage((fileData))
      setMsg(res.message || 'Image uploaded successfully')
      value = res.path
    } catch (error) {
      setMsg('Upload image failed: ')
      console.log('Upload image failed: ', error.message)
    }
  }

  return (
    <Card>
      <Card.Header>{label}</Card.Header>
      {/* encType  */}
      <Form onSubmit={handleUpload}
        encType='multipart/form-data'>
        <Form.Group controlId="UploadImage" className="mb-3">
          <Form.Label>{label}</Form.Label>
          <Form.Control
            type="file"
            isInvalid={!!error}
            placeholder={placeholder}
            name={name}
            onChange={handleChange}
            value={value}
          />
        </Form.Group>
        <Card.Text className='mb-2'>
          {msg && {msg}}
        </Card.Text>
      </Form>
    </Card>
  )
}

export default UploadImage
