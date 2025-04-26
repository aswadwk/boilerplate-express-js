import express from 'express';
import webhookController from '../controllers/whatsapp-controller.js';

const publicApi = express.Router();

publicApi.get('/', (req, res) => {
    res.status(200).json({
        status: true,
        message: 'Welcome to the public API.',
    });
});

publicApi.get('/webhook', webhookController.verifyWebHookWhatsapp);
publicApi.post('/webhook', webhookController.handleWebHookWhatsapp);

// send a message
publicApi.post('/send', webhookController.sendMessageWhatsapp);

export default publicApi;
