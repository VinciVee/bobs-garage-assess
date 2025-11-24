import { FloatingLabel, Form } from 'react-bootstrap'

function InputField({ label, name, type = "text", value, placeholder, handleChange, error }) {
  return (
    <FloatingLabel
      controlId={name}
      label={label}
      className="mb-3" >
      <Form.Control
        type={type}
        isInvalid={!!error}
        placeholder={placeholder}
        name={name}
        onChange={handleChange}
        value={value} />
      <Form.Control.Feedback type="invalid">
        {error}
      </Form.Control.Feedback>
    </FloatingLabel>
  )
}

export default InputField

// <Form.Group className="mb-3">
//   <Form.Label>{label}</Form.Label>
//   <Form.Control
//     name={name}
//     type={type}
//     value={value}
//     onChange={onChange}
//     className={error ? "is-invalid" : ""}
//   />
//   {error && <div className="invalid-feedback">{error}</div>}
// </Form.Group>
