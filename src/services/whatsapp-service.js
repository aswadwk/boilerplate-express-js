import { v7 as uuidV7 } from 'uuid';
import prismaClient from '../application/database.js';
import ResponseError from '../commons/response-error.js';

const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN || 'secret';

const verifyWebHook = async (request) => {
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

const handleWebHook = async (request) => {
    console.log('Webhook received:', JSON.stringify(request.body, null, 2));

    // store the webhook data in the database
    return prismaClient.webhook.create({
        data: {
            id: uuidV7(),
            response_json: request.body,
            url: request.url,
        },
        select: {
            id: true,
        },
    });
};

const bodyText = (to, message) => ({
    messaging_product: 'whatsapp',
    to,
    type: 'text',
    text: {
        body: message || 'Hello from WhatsApp API',
    },
});

const bodyWithMedia = (to, message, media) => ({
    messaging_product: 'whatsapp',
    to,
    type: 'image',
    image: {
        link: message || 'https://placehold.co/600x400',
    },
});

const sendMessage = async (request) => {
    const { to, message, media } = request.body;

    const url = `https://graph.facebook.com/v22.0/${process.env.WHATSAPP_PHONE_ID}/messages`;
    const headers = {
        Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
        'Content-Type': 'application/json',
    };

    if (media) {
        headers['Content-Type'] = 'multipart/form-data';
    }
    const body = media ? bodyWithMedia(to, message, media) : bodyText(to, message);

    if (!to || !message) {
        throw new ResponseError(400, 'Missing required parameters: to and message');
    }

    const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new ResponseError(response.status, error.error.message);
    }

    const data = await response.json();
    if (data.error) {
        throw new ResponseError(response.status, data.error.message);
    }

    return data;
};

export default {
    verifyWebHook,
    handleWebHook,
    sendMessage,
};
