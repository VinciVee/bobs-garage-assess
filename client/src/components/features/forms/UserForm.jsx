/**
 * UserForm component
 * Handles forms for adding or editing users
 *
 */
// Importing Local components
import UploadImage from "../dashboard/UploadImage";
import InputField from "../../common/InputField";
import BgButton from "../../common/BgButton";
import BgCheck from "../../common/BgCheck"
// import * as styles from '.css';
// react* modules
import { Form, Spinner } from "react-bootstrap";

function UserForm({formData, handleSubmit, handleChange, loading}) {
  const { firstName, lastName, email, image, password, passwordCompare, isAdmin, errors } = formData

  return (
    <Form onSubmit={handleSubmit} encType='multipart/form-data'>
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
        name="image"
        handleChange={handleChange}
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
      {/* IS ADMIN */}
      <BgCheck
        label="Admin?"
        name={isAdmin}
        type="checkbox"
        handleChange={handleChange}
        error={errors.isAdmin}
      />
      {/* SUBMIT BUTTON */}
      <BgButton loadingState={loading} type="submit">
        {loading ? <Spinner animation="border" variant="light" /> : 'Submit'}
      </BgButton>
    </Form>
  )
}

export default UserForm
