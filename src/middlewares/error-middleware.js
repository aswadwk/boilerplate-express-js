import ResponseError from "../commons/response-error.js";

const errorMiddleware = async (err, req, res, next) => {

    if (!err) {
        next();

        return
    }

    if (err instanceof ResponseError) {
        return res.status(err.status).json({
            status: false,
            message: err.message,
            data: null
        }).end();
    }

    return res.status(500).json({
        status: false,
        message: err.message,
        data: null
    }).end();
}

export {
    errorMiddleware
}