import whatsappService from '../services/whatsapp-service.js';

const handleWebHookWhatsapp = async (req, res, next) => {
    try {
        const result = await whatsappService.handleWebHook(req);

        res.status(200).json({
            status: true,
            message: 'Webhook received successfully.',
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

export default {
    handleWebHookWhatsapp,
};
