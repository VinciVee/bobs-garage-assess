import { Form } from 'react-bootstrap'

function UploadImage({label, name, handleChange, error}) {
  return (
    <Form.Group controlId="upload-image" className="mb-3">
      <Form.Control
        type="file"
        isInvalid={!!error}
        name={name}
        onChange={handleChange}
      />
      <Form.Control.Feedback type="invalid">
        {error}
      </Form.Control.Feedback>
    </Form.Group>
  )
}

export default UploadImage
