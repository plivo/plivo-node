const Joi = require('joi');

const currencySchema = Joi.object({
  fallback_value: Joi.string().required(),
  currency_code: Joi.string().required(),
  amount_1000: Joi.number().required(),
});

const dateTimeSchema = Joi.object({
  fallback_value: Joi.string().required(),
});

const parameterSchema = Joi.object({
  type: Joi.string().required(),
  text: Joi.string().optional(),
  media: Joi.string().optional(),
  currency: currencySchema.optional(),
  date_time: dateTimeSchema.optional(),
});

const componentSchema = Joi.object({
  type: Joi.string().required(),
  sub_type: Joi.string().optional(),
  index: Joi.string().optional(),
  parameters: Joi.array().items(parameterSchema).optional(),
});

const templateSchema = Joi.object({
  name: Joi.string().required(),
  language: Joi.string().required(),
  components: Joi.array().items(componentSchema).optional(),
});

// Validate the data against the templateSchema
export function validateTemplate(data){
    const { error, value } = templateSchema.validate(data);
    return {error, value}
}




