import whatsappService from '../services/whatsapp-service.js';

const handleWebHookWhatsapp = async (req, res, next) => {
    try {
        res.status(200).send(await whatsappService.handleWebHook(req));
    } catch (error) {
        next(error);
    }
};

export default {
    handleWebHookWhatsapp,
};
