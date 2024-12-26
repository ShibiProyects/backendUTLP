const Joi = require("joi");

const roleSchema = Joi.object({
    name: Joi.string().email().required().messages({
        'any.required': 'name is required.',
        'string.name': 'Invalid name.'
    }),
});

module.exports = roleSchema;