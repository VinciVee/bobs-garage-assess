import { Form } from "react-bootstrap"

function BgSelect({options, label, name, value, handleChange, error}) {
  // To-do: add aria-label
  return (
    <Form.Group controlId={name}>
      <Form.Label>{label}</Form.Label>
      <Form.Select
        name={name}
        value={value}
        onChange={handleChange}
      >
        <option>Open this select menu</option>
        {options.map((opt) => {
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        })}
      </Form.Select>
      <Form.Control.Feedback type="invalid">
        {error}
      </Form.Control.Feedback>
    </Form.Group>
  )
}

export default BgSelect
