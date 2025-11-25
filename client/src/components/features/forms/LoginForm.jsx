/**
 * LoginForm component
 * Handles the form fields and validation
 *
 */

// Importing Local components
import InputField from "../../common/InputField";
import BgButton from "../../common/BgButton";
import BgCard from "../../common/BgCard";
import * as styles from './LoginForm.css';
// react* modules
import { Form, Spinner } from "react-bootstrap";
import { Link } from "react-router";


function LoginForm({formData, handleSubmit, handleChange, loading}) {
  const { email, password, errors } = formData

  return (
    <BgCard title="Log in" authform>
      <Form onSubmit={handleSubmit}>
        {/* EMAIL */}
        <InputField
          label="Email address*"
          name="email"
          type="email"
          value={email}
          placeholder="name@example.com"
          handleChange={handleChange}
          error={errors.email}
        />
        {/* PASSWORD */}
        <InputField
          label="Password*"
          name="password"
          type="password"
          value={password}
          placeholder="Password"
          handleChange={handleChange}
          error={errors.password}
        />
        {/* SUBMIT BUTTON */}
        <BgButton loadingState={loading} type="submit">
          {loading ? <Spinner animation="border" variant="light" /> : 'Submit'}
        </BgButton>
      </Form>
      <div className={styles.userNav}>
        <span>Not a member? &nbsp;
          <Link to="/register">Sign Up Here</Link>
        </span>
      </div>
    </BgCard>
  )
}

export default LoginForm
