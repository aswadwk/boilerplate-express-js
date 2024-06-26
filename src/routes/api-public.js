import express from 'express';
import authController from '../controllers/auth-controller.js';

const publicApi = express.Router();

publicApi.post('/api/v1/register', authController.register);
publicApi.post('/api/v1/login', authController.login);

export default publicApi;
