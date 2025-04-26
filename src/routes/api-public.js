import express from 'express';
import webhookController from '../controllers/webhook-controller.js';

const publicApi = express.Router();

publicApi.get('/', (req, res) => {
    res.status(200).json({
        status: true,
        message: 'Welcome to the public API.',
    });
});
publicApi.get('/api/v1/webhook', webhookController.handleWebHookWhatsapp);
publicApi.post('/api/v1/webhook', webhookController.handleWebHookWhatsapp);
publicApi.get('/webhook', webhookController.handleWebHookWhatsapp);
publicApi.post('/webhook', webhookController.handleWebHookWhatsapp);

export default publicApi;
