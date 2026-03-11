/**
 * ProductsForm component
 * Handles forms for adding or editing products
 *
 */
// Importing Local components
import InputField from "../../common/InputField";
import UploadImage from "../dashboard/UploadImage";
import BgButton from "../../common/BgButton";
// import * as styles from '.css';
// react* modules
import { Form, Spinner } from "react-bootstrap";

function ProductForm({formData, handleSubmit, handleTextChange, handleFileChange, loading, disabled}) {
  const {name, desc, image, price, errors} = formData

  return (
    <Form onSubmit={handleSubmit} encType='multipart/form-data'>
      {/* NAME */}
      <InputField
        label="Service name*"
        name="name"
        type="text"
        value={name}
        placeholder="Service name"
        handleChange={handleTextChange}
        error={errors.name}
      />
      {/* DESCRIPTION */}
      <InputField
        label="Service description*"
        name="desc"
        type="text"
        value={desc}
        placeholder="First name"
        handleChange={handleTextChange}
        error={errors.desc}
      />
      {/* IMAGE */}
      <UploadImage
        label="Upload an image*"
        name="image"
        handleChange={handleFileChange}
        error={errors.image}
      />
      {/* PRICE */}
      <InputField
        label="Service cost*"
        name="price"
        type="text"
        value={price}
        placeholder="0.00"
        handleChange={handleTextChange}
        error={errors.price}
      />
      {/* SUBMIT BUTTON */}
      <BgButton loadingState={loading} type="submit">
        {
          loading || disabled
          ? <Spinner animation="border" variant="light" />
          : 'Submit'
        }
      </BgButton>
    </Form>
  )
}

export default ProductForm
