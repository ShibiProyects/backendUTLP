const Joi = require("joi");
const authSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'any.required': 'Email is required.',
        'string.email': 'Invalid email address.'
    }),
    password: Joi.string().required().messages({
        'any.required': 'Password is required.',
        'string.base': 'Password must be a string.'
    }),
});

module.exports = authSchema;