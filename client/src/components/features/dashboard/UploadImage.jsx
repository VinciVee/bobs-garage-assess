import { Form } from 'react-bootstrap'

function UploadImage({label, name, fileInputRef, handleChange, error}) {
  return (
    <Form.Group controlId="upload-image" className="mb-3">
      <Form.Control
        type="file"
        name={name}
        ref={fileInputRef}
        onChange={handleChange}
        isInvalid={!!error}
      />
      <Form.Control.Feedback type="invalid">
        {error}
      </Form.Control.Feedback>
    </Form.Group>
  )
}

export default UploadImage
