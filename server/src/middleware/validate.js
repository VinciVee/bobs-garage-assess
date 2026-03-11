const validate = (schema) => {
  return (req, res, next) => {
    console.log('validating...', req.body)
    const data = req.body

    const options = {
      abortEarly: false,  // return all errors
      allowUnknown: true, // ignore unknown props
      stripUnknown: true  // remove unknown props
    }

    // Convert empty strings to undefined for optional fields
    const sanitizedData = {};
    // Ensure data is an object before iterating
    if (data && typeof data === "object") {
      for (const [key, val] of Object.entries(data)) {
        sanitizedData[key] = val === "" ? undefined : val;
      }
    }

    console.log('sanitize data: ', sanitizedData)

    const { error, value } = schema.validate(sanitizedData, options);

    if (error) {
      console.log('Error occured', error)
      const errors = error.details.map((detail) => ({
        field: detail.path.join("."),
        message: detail.message,
      }));

      return res.status(400).json({
        error: "Validation failed",
        details: errors,
      });
    }

    next();
  };
};

module.exports = validate;
