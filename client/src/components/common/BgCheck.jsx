// Bootstrap check box, radio or switch

import { Form } from "react-bootstrap"

function BgCheck({label, name, type = "checkbox", handleChange, error}) {
  return (
    <>
      <Form.Check
        // inline
        // disabled
        // check value with e.target.checked
        label={label}
        name={name}
        type={type}
        id={name}
        onChange={handleChange}
      >
        <Form.Control.Feedback type="invalid">
          {error}
        </Form.Control.Feedback>
      </Form.Check>
    </>
  )
}

export default BgCheck
