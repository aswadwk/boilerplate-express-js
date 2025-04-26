import whatsappService from '../services/whatsapp-service.js';

const verifyWebHookWhatsapp = async (req, res, next) => {
    try {
        res.status(200).send(await whatsappService.verifyWebHook(req));
    } catch (error) {
        next(error);
    }
};

const handleWebHookWhatsapp = async (req, res, next) => {
    try {
        res.status(200).json({
            status: true,
            message: 'Webhook received',
            data: await whatsappService.handleWebHook(req),
        });
    } catch (error) {
        next(error);
    }
};

const sendMessageWhatsapp = async (req, res, next) => {
    try {
        res.status(200).json({
            status: true,
            message: 'Message sent',
            data: await whatsappService.sendMessage(req),
        });
    } catch (error) {
        next(error);
    }
};

export default {
    verifyWebHookWhatsapp,
    handleWebHookWhatsapp,
    sendMessageWhatsapp,
};
