function globalErrorHandler(err, req, res, next) {
    console.error(err.message);
    res.status(500).json({ error: "Internal server error" });
}

module.exports = globalErrorHandler;