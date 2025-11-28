const Joi = require('joi')

// AUTHENTICATION SCHEMA
// Register
const registerSchema = Joi.object({
  firstName: Joi.string().min(3).max(50).alphanum().trim().required().messages({
    "string.empty": "First name is required",
    "string.min": "First name must be at least 3 characters",
    "string.max": "First name must not exceed 50 characters",
    "string.alphanum": "Please enter a valid name",
  }),
  lastName: Joi.string().min(3).max(50).alphanum().trim().required().messages({
    "string.empty": "Last name is required",
    "string.min": "Name must be at least 3 characters",
    "string.max": "Name must not exceed 50 characters",
    "string.alphanum": "Please enter a valid name",
  }),
  email: Joi.string()
  .email({ minDomainSegments: 2, tlds: {allow: ['com', 'net', 'com.au', '.net.au']}})
  .trim().lowercase().required().messages({
    "string.empty": "Email is required",
    "string.email": "Please provide a valid email address",
  }),
  image: Joi.string().min(10).max(100).trim().lowercase().required().messages({
    "string.empty": "Image URL (provided or placeholder) is missing",
    "string.max": "Image URL exceeds number of characters",
  }),
  password: Joi.string().min(8).required().messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 8 characters",
  }),
});

// Login
const loginSchema = Joi.object({
  email: Joi.string()
  .email({ minDomainSegments: 2, tlds: {allow: ['com', 'net', 'com.au', '.net.au']}})
  .trim().lowercase().required().messages({
    "string.empty": "Email is required",
  }),
  password: Joi.string().required().messages({
    "string.empty": "Password is required",
  }),
});


// PRODUCTS VALIDATION SCHEMAS
// Add a service
const addServiceSchema = Joi.object({
  name: Joi.string().min(3).max(200).alphanum().trim().required().messages({
    "string.empty": "Service name is required",
    "string.min": "Service name must be at least 3 characters",
    "string.max": "Service name must not exceed 200 characters",
  }),
  description: Joi.string().min(10).alphanum().trim().required().messages({
    "string.empty": "Service description is required",
    "string.min": "The description must be at least 10 characters",
  }),
  image: Joi.string().min(10).max(100).trim().required().messages({
    "string.empty": "Image URL (provided or placeholder) is missing",
    "string.max": "Image URL exceeds number of characters",
  }),
  price: Joi.number().positive().precision(2).required().messages({
    "number.base": "Price must be a number",
    "number.positive": "Price must be a positive number",
    "any.required": "Price is required",
  }),
});

// Edit a service
const updateServiceSchema = Joi.object({
  name: Joi.string().min(3).max(200).alphanum().trim().optional().messages({
    "string.min": "Service name must be at least 3 characters",
    "string.max": "Service name must not exceed 200 characters",
  }),
  description: Joi.string().min(10).alphanum().trim().optional().messages({
    "string.min": "Description must be at least 10 characters",
  }),
  image: Joi.string().min(10).max(100).trim().optional().messages({
    "string.empty": "Image URL (provided or placeholder) is missing",
    "string.max": "Image URL exceeds number of characters",
  }),
  price: Joi.number().positive().precision(2).optional().messages({
    "number.base": "Price must be a number",
    "number.positive": "Price must be a positive number",
  }),
  // Minimum of item must be provided for an update
}).min(1);

// USER VALIDATION SCHEMAS
// add user
const addUserSchema = Joi.object({
  firstName: Joi.string().min(3).max(50).alphanum().trim().required().messages({
    "string.empty": "First name is required",
    "string.min": "First name must be at least 3 characters",
    "string.max": "First name must not exceed 50 characters",
    "string.alphanum": "Please enter a valid name",
  }),
  lastName: Joi.string().min(3).max(50).alphanum().trim().required().messages({
    "string.empty": "Last name is required",
    "string.min": "Name must be at least 3 characters",
    "string.max": "Name must not exceed 50 characters",
    "string.alphanum": "Please enter a valid name",
  }),
  email: Joi.string()
  .email({ minDomainSegments: 2, tlds: {allow: ['com', 'net', 'com.au', '.net.au']}})
  .trim().lowercase().required().messages({
    "string.empty": "Email is required",
    "string.email": "Please provide a valid email address",
  }),
  image: Joi.string().min(10).max(100).trim().lowercase().required().messages({
    "string.empty": "Image URL (provided or placeholder) is missing",
    "string.max": "Image URL exceeds number of characters",
  }),
  password: Joi.string().min(8).required().messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 8 characters",
  }),
  isAdmin: Joi.boolean(),
});

// update user
const updateUserSchema = Joi.object({
  firstName: Joi.string().min(3).max(50).alphanum().trim().required().messages({
    "string.empty": "First name is required",
    "string.min": "First name must be at least 3 characters",
    "string.max": "First name must not exceed 50 characters",
    "string.alphanum": "Please enter a valid name",
  }),
  lastName: Joi.string().min(3).max(50).alphanum().trim().required().messages({
    "string.empty": "Last name is required",
    "string.min": "Name must be at least 3 characters",
    "string.max": "Name must not exceed 50 characters",
    "string.alphanum": "Please enter a valid name",
  }),
  email: Joi.string()
  .email({ minDomainSegments: 2, tlds: {allow: ['com', 'net', 'com.au', '.net.au']}})
  .trim().lowercase().required().messages({
    "string.empty": "Email is required",
    "string.email": "Please provide a valid email address",
  }),
  image: Joi.string().min(10).max(100).trim().lowercase().required().messages({
    "string.empty": "Image URL (provided or placeholder) is missing",
    "string.max": "Image URL exceeds number of characters",
  }),
  password: Joi.string().min(8).required().messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 8 characters",
  }),
  isAdmin: Joi.boolean(),
  // At least 1 item must be updated
}).min(1);

module.exports = {
  registerSchema,
  loginSchema,
  addServiceSchema,
  updateServiceSchema,
  addUserSchema,
  updateUserSchema,
};
