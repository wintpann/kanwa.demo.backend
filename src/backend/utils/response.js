const RESPONSE = {
    OK: 'OK',
    OK_NOTIFY: 'OK_NOTIFY',
    BAD: 'BAD',
    BAD_NOTIFY: 'BAD_NOTIFY',
    AUTH_REQUIRED: 'AUTH_REQUIRED',
};

const RESPONSE_TO_CODE = {
    [RESPONSE.OK]: 200,
    [RESPONSE.OK_NOTIFY]: 200,
    [RESPONSE.BAD]: 400,
    [RESPONSE.BAD_NOTIFY]: 400,
    [RESPONSE.AUTH_REQUIRED]: 401,
};

const RESPONSE_TO_KIND = {
    [RESPONSE.OK]: 'success',
    [RESPONSE.OK_NOTIFY]: 'success',
    [RESPONSE.BAD]: 'error',
    [RESPONSE.BAD_NOTIFY]: 'error',
    [RESPONSE.AUTH_REQUIRED]: 'auth_required',
};

const RESPONSE_TO_NOTIFY = {
    [RESPONSE.OK]: false,
    [RESPONSE.OK_NOTIFY]: true,
    [RESPONSE.BAD]: false,
    [RESPONSE.BAD_NOTIFY]: true,
    [RESPONSE.AUTH_REQUIRED]: false,
};

const respond = (res, response, data, message) => {
    res.status(RESPONSE_TO_CODE[response]).json({
        data,
        status: {
            message,
            kind: RESPONSE_TO_KIND[response],
            shouldNotify: RESPONSE_TO_NOTIFY[response],
        },
    });
};

const createController = (callback) => async (req, res) => {
    try {
        await callback(req, res);
    } catch (e) {
        if (e instanceof ResponseError) {
            respond(res, e.response, null, e.responseMessage);
        } else {
            respond(res, RESPONSE.BAD, null, e.message);
        }
    }
};

class ResponseError extends Error {
    constructor(message, response = RESPONSE.BAD_NOTIFY) {
        super(message);
        this.responseMessage = message;
        this.response = response;
    }
}

const mapToResponseError =
    (response = RESPONSE.BAD_NOTIFY, message) =>
    (e) => {
        throw new ResponseError(message ?? e.message, response);
    };

export { respond, RESPONSE, ResponseError, createController, mapToResponseError };
