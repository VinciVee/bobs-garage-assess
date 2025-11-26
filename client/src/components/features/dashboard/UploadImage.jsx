import { useState } from 'react'
import adminService from '../../../services/adminService'
import { Form } from 'react-bootstrap'
// Local modules
import InputField from '../../common/InputField'

function UploadImage({label, name, value, placeholder, handleChange, error}) {

  return (
    <Form.Group controlId="upload-image" className="mb-3">
      <Form.Control
        type="file"
        isInvalid={!!error}
        name={name}
        value={value}
        defaultValue={placeholder}
        onChange={handleChange}
      />
      <Form.Control.Feedback type="invalid">
        {error}
      </Form.Control.Feedback>
    </Form.Group>
  )
}

export default UploadImage
