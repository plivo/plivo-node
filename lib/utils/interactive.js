const Joi = require('joi');

// Schema for Row
const rowSchema = Joi.object({
  id: Joi.string().optional(),
  title: Joi.string().optional(),
  description: Joi.string().optional(),
});

// Schema for Section
const sectionSchema = Joi.object({
  title: Joi.string().optional(),
  rows: Joi.array().items(rowSchema).optional(),
});

// Schema for Buttons
const buttonsSchema = Joi.object({
  id: Joi.string().optional(),
  title: Joi.string().optional(),
  cta_url: Joi.string().optional(),
});

// Schema for Action
const actionSchema = Joi.object({
  buttons: Joi.array().items(buttonsSchema).optional(),
  sections: Joi.array().items(sectionSchema).optional(),
});

// Schema for Header
const headerSchema = Joi.object({
  type: Joi.string().optional(),
  text: Joi.string().optional(),
  media: Joi.string().optional(),
});

// Schema for Body
const bodySchema = Joi.object({
  text: Joi.string().optional(),
});

// Schema for Footer
const footerSchema = Joi.object({
  text: Joi.string().optional(),
});

// Schema for Interactive
const interactiveSchema = Joi.object({
  type: Joi.string().optional(),
  header: headerSchema.optional(),
  body: bodySchema.optional(),
  footer: footerSchema.optional(),
  action: actionSchema.optional(),
});

// Function to validate the data against the interactiveSchema
function validateInteractive(data) {
  const { error, value } = interactiveSchema.validate(data, { allowUnknown: true });
  return { error, value };
}

module.exports = {
  validateInteractive,
};
