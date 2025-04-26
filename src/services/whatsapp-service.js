import ResponseError from '../commons/response-error.js';

const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN || 'secret';
// const MY_TOKEN = process.env.WHATSAPP_MY_TOKEN || '';

const handleWebHook = async (request) => {
    console.log('Webhook received Query:', request.query);

    const mode = request.query['hub.mode'];
    const challange = request.query['hub.challenge'];
    const token = request.query['hub.verify_token'];

    if (mode && token) {
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {
            console.log('WEBHOOK_VERIFIED');
            return challange;
        }
    }

    console.log('Invalid token');
    throw new ResponseError(403, 'Unauthorized');
};

export default {
    handleWebHook,
};
