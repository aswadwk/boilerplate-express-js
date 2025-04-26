import ResponseError from '../commons/response-error.js';

const handleWebHook = async (request) => {
    console.log('Webhook received Query:', request.query);
    const myToken = 'EAAREGZBvLSx0BO97KCXkBvwZBvIOwn8Xahc3pJmCuEnTD6U48Gqi4K6QRV2RbtAGF51NZCpuwZB2gRsbcpSQFuI8p3hQLNfAJLKr33b9l8P2J1QyUPTAuCRDGZCEhnoY1VZAlUpJmUnry0tZCFZAL6dGxmc2HadIBxGmzLJaa9nXrtG9LTlG0QxZAsaIvcXhTrlN68i3SNZBqTmAr2vcsQxnXgRAnSGV2SvKbB0xUWnZAMEtb0ZD';

    const mode = request.query['hub.mode'];
    const challange = request.query['hub.challenge'];
    const token = request.query['hub.verify_token'];

    if (mode && token) {
        if (mode === 'subscribe' && token === 'secret') {
            console.log('WEBHOOK_VERIFIED');
            return challange;
        }
    }

    console.log('Invalid token');

    // throw new Error('Invalid token', 403);
    throw new ResponseError(403, 'Unauthorized');
};

export default {
    handleWebHook,
};
