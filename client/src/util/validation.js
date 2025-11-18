// File: src/util/validation.js
// This file will hold our client-side validation functions.

/**
  Create an is_empty function
  Function: is_empty
  param: value, the input we wish to check.
  This function will check if the passed in value is undefined, null, and empty object or an empty string.
  return true if any of the test are true, false otherwise
 *
 */
export const is_empty = (value) =>
  value === undefined ||
  value === null ||
  (typeof value === 'object' && Object.keys(value).length === 0) ||
  (typeof value === 'string' && value.trim().length === 0)

/*
  Regular expressions to do some testing.
  Test if a string contains any special characters
  Function: alpha
  param: value, the string we are testing
  return: true if we have any special characters.
*/
export const alpha = (value) => {
  let ex = /[^a-zA-Z]+$/
  const result = ex.test(value)
  return result
}

export const isValidPrice = (value) => {
  let ex = /^\d+(\.\d{1,2})?$/  // Regular expressions are defined between '//'
  const result = ex.test(value)
  return result
}

