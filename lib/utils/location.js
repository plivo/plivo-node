const Joi = require('joi');

// Schema for Location
const locationSchema = Joi.object({
  latitude: Joi.string().required(),
  longitude: Joi.string().required(),
  name: Joi.string().required(),
  address: Joi.string().required()
});

// Function to validate location data
function validateLocation(data) {
    const { error, value } = locationSchema.validate(data, { allowUnknown: true });
    return { error, value };
  }

module.exports = {
    locationSchema,
  validateLocation
};
