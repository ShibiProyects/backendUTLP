const validateSchema = function (schema, data) {
    const { error, value } = schema.validate(data, { abortEarly: false });
    if (error) {
        const errorDictionary = {};
        error.details.forEach(index => {
            errorDictionary[index.context.key] = index.message;
        });
        return { errors: errorDictionary, value: null };
    }
    return { errors: null, value };
};

module.exports = validateSchema;