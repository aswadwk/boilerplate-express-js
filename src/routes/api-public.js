import express from 'express';
import authController from '../controllers/auth-controller.js';

const publicApi = express.Router();

publicApi.post('/api/v1/register', authController.register);
publicApi.post('/api/v1/login', authController.login);
publicApi.get('/api/v1/proses', authController.prosesData);

export default publicApi;
