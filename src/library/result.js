const resultStatusEnum = require("./resultStatusEnum")

class Result {
    /**
     * @param {resultStatusEnum} status
     * @param {*} value
     * @param error
     */
    constructor(status, value, error = []) {
        this.status = status;
        this.value = value;
        this.error = error;
    }

    /**
     *
     * @param {*} value
     * @returns {Result}
     */
    static success(value) {
        return new Result(resultStatusEnum.OK, value);
    }

    /**
     *
     * @param {*} error
     * @returns {Result}
     */
    static failure(error) {
        return new Result(resultStatusEnum.ERROR, null, error);
    }

    /**
     *
     * @param {*} error
     * @returns {Result}
     */
    static notFound(error) {
        return new Result(resultStatusEnum.NOT_FOUND, null, error);
    }

    /**
     *
     * @param {*} error
     * @returns {Result}
     */
    static validationError(error) {
        return new Result(resultStatusEnum.VALIDATION_ERROR, null, error);
    }

    /**
     *
     * @param {*} error
     * @returns {Result}
     */
    static conflict(error) {
        return new Result(resultStatusEnum.CONFLICT, null, error);
    }
}

module.exports.Result = Result;