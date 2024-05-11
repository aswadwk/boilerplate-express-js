import Joi from "joi"

const registerValidation = Joi.object({
    // name: Joi.string().required().min(3),
    password: Joi.string().required().min(8),
    email: Joi.string().email().required(),
}).options({ stripUnknown: true });


const loginValidation = Joi.object({
    password: Joi.string().required().min(8),
    email: Joi.string().email().required(),
}).options({ stripUnknown: true });


export {
    registerValidation,
    loginValidation,
}