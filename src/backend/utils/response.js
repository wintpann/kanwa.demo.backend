const RESPONSE_CODE = {
    OK: 200,
    BAD_REQUEST: 400,
    UNKNOWN_ERROR: 500,
    NOT_AUTHORIZED: 401,
};

const CODE_TO_STATUS = {
    [RESPONSE_CODE.OK]: 'info',
    [RESPONSE_CODE.BAD_REQUEST]: 'error',
    [RESPONSE_CODE.UNKNOWN_ERROR]: 'unknown',
    [RESPONSE_CODE.NOT_AUTHORIZED]: 'auth',
};

const respond = (res, code, data, message) => {
    const response = { data };
    if (message) {
        response.status = { code: CODE_TO_STATUS[code], message };
    }
    res.status(code).json(response);
};

const createController = (callback) => async (req, res) => {
    try {
        await callback(req, res);
    } catch (e) {
        if (e instanceof ResponseError) {
            respond(res, RESPONSE_CODE.BAD_REQUEST, null, e.responseMessage);
        } else {
            respond(res, RESPONSE_CODE.UNKNOWN_ERROR, null, e.message);
        }
    }
};

class ResponseError extends Error {
    constructor(message) {
        super(message);
        this.responseMessage = message;
    }
}

const mapToResponseError = (message) => () => {
    throw new ResponseError(message);
};

export { respond, RESPONSE_CODE, ResponseError, createController, mapToResponseError };
