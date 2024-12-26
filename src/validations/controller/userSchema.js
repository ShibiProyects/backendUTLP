const Joi = require("joi");

const userSchema = Joi.object({
    firstName: Joi.string().required().messages({
        'string.base': 'First name must be a string.',
        'any.required': 'First name is required.'
    }),
    lastName: Joi.string().required().messages({
        'string.base': 'Last name must be a string.',
        'any.required': 'Last name is required.'
    }),
    email: Joi.string().email().required().messages({
        'string.email': 'Please provide a valid email address.',
        'any.required': 'Email is required.'
    }),
    username: Joi.string().required().messages({
        'string.base': 'Username must be a string.',
        'any.required': 'Username is required.'
    }),
    password: Joi.string().required().messages({
        'string.base': 'Password must be a string.',
        'any.required': 'Password is required.'
    }),
    confirmPassword: Joi.string()
        .valid(Joi.ref('password'))
        .required()
        .messages({
            'any.only': 'Passwords do not match.',
            'any.required': 'Confirm password is required.'
        })
});

module.exports = userSchema;