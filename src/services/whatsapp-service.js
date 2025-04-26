import ResponseError from '../commons/response-error.js';

const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN || 'secret';

const handleWebHook = async (request) => {
    const mode = request.query['hub.mode'];
    const challange = request.query['hub.challenge'];
    const token = request.query['hub.verify_token'];

    if (mode && token) {
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {
            return challange;
        }
    }

    throw new ResponseError(403, 'Unauthorized');
};

export default {
    handleWebHook,
};
