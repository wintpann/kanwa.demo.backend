const RESPONSE = {
    OK: 'OK',
    OK_NOTIFY: 'OK_NOTIFY',
    BAD: 'BAD',
    BAD_NOTIFY: 'BAD_NOTIFY',
};

const RESPONSE_TO_CODE = {
    [RESPONSE.OK]: 200,
    [RESPONSE.OK_NOTIFY]: 200,
    [RESPONSE.BAD]: 400,
    [RESPONSE.BAD_NOTIFY]: 400,
};

const RESPONSE_TO_KIND = {
    [RESPONSE.OK]: 'success',
    [RESPONSE.OK_NOTIFY]: 'success',
    [RESPONSE.BAD]: 'error',
    [RESPONSE.BAD_NOTIFY]: 'error',
};

const RESPONSE_TO_NOTIFY = {
    [RESPONSE.OK]: false,
    [RESPONSE.OK_NOTIFY]: true,
    [RESPONSE.BAD]: false,
    [RESPONSE.BAD_NOTIFY]: true,
};

const respond = (res, response, data, message = '') => {
    const result = { data };
    if (message) {
        result.status = {
            kind: RESPONSE_TO_KIND[response],
            message,
            shouldNotify: RESPONSE_TO_NOTIFY[response],
        };
    }
    res.status(RESPONSE_TO_CODE[response]).json(result);
};

const createController = (callback) => async (req, res) => {
    try {
        await callback(req, res);
    } catch (e) {
        if (e instanceof ResponseError) {
            respond(res, RESPONSE.BAD_NOTIFY, null, e.responseMessage);
        } else {
            respond(res, RESPONSE.BAD, null, e.message);
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

export { respond, RESPONSE, ResponseError, createController, mapToResponseError };
