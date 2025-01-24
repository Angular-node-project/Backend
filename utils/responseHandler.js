const unifiedResponse = (status, message, data = null) => {
    return { status, message, data };
};

const handleError = (res, err) => {
    console.error(err);
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';
    res.status(status).json(unifiedResponse(status, message));
};

module.exports = { unifiedResponse, handleError };