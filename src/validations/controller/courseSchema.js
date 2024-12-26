const Joi = require("joi");

const courseSchema = Joi.object({
    teacherId: Joi.number().integer().positive().required().messages({
        'number.base': 'Teacher ID must be a number.',
        'number.integer': 'Teacher ID must be an integer.',
        'number.positive': 'Teacher ID must be a positive number.',
        'any.required': 'Teacher ID is required.'
    }),
    courseStatus: Joi.number().integer().positive().required().messages({
        'number.base': 'Course Status must be a number.',
        'number.integer': 'Course Status must be an integer.',
        'number.positive': 'Course Status must be a positive number.',
        'any.required': 'Course Status is required.'
    }),
    title: Joi.string().trim().min(1).required().messages({
        'string.base': 'Title must be a string.',
        'string.empty': 'Title cannot be empty.',
        'any.required': 'Title is required.'
    }),
    description: Joi.string().allow(null).optional(),
    linkMeet: Joi.string().uri().required().messages({
        'string.base': 'Meet link must be a valid URL.',
        'any.required': 'Meet link is required.'
    })
});

module.exports = courseSchema;