/** LoginForm component
 *  Handles the form fields and validation
 *
 */
// Importing Local components
import UploadImage from "../dashboard/UploadImage";
import InputField from "../../common/InputField";
import BgButton from "../../common/BgButton";
import BgCard from "../../common/BgCard";
import * as styles from './RegisterForm.css'
// react* modules
import { Link } from "react-router";
import { Form, Spinner } from "react-bootstrap";

function RegisterForm({formData, handleSubmit, handleChange, loading}) {
  const { firstName, lastName, email, image, password, passwordCompare,  errors } = formData

  return (
    <BgCard title="Register" authform>
      <Form onSubmit={handleSubmit}>
        {/* FIRSTNAME */}
        <InputField
          label="First name*"
          name="firstName"
          type="text"
          value={firstName}
          placeholder="First name"
          handleChange={handleChange}
          error={errors.firstName}
        />
        {/* LASTNAME */}
        <InputField
          label="Last name*"
          name="lastName"
          type="text"
          value={lastName}
          placeholder="Last name"
          handleChange={handleChange}
          error={errors.lastName}
        />
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
        {/* IMAGE */}
        <UploadImage
          label="Upload an image*"
          name="profile image"
          value={image}
          placeholder="Choose image to upload"
          error={errors.image}
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
        {/* PASSWORD CONFIRMATION */}
        <InputField
          label="Password Confirmation*"
          name="passwordCompare"
          type="password"
          value={passwordCompare}
          placeholder="Password Confirmation"
          handleChange={handleChange}
          error={errors.passwordCompare}
          // controlId="password-confirm"
        />
        {/* SUBMIT BUTTON */}
        <BgButton loadingState={loading} type="submit">
          {loading ? <Spinner animation="border" variant="light" /> : 'Submit'}
        </BgButton>
      </Form>
      <div className={styles.userNav}>
        <span>Already a member? &nbsp;
          <Link to="/login">Login Here</Link>
        </span>
      </div>
    </BgCard>
  )
}

export default RegisterForm
