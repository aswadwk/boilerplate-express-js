import { verifyAccessToken } from '../application/security.js';
import ResponseError from '../commons/response-error.js';

const authenticatedMiddleware = (req, res, next) => {
    const accessToken = req.get('Authorization');
    if (!accessToken) {
        throw new ResponseError(401, 'Unauthorized');
    }

    const user = verifyAccessToken(accessToken.split(' ')[1]);

    req.user = user;

    next();
};

export default authenticatedMiddleware;
