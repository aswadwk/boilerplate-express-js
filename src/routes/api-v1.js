import express from 'express';
import authController from '../controllers/auth-controller.js';
import authenticatedMiddleware from '../middlewares/authenticated-middleware.js';

const apiV1 = express.Router();

apiV1.use(authenticatedMiddleware);
apiV1.get('/api/v1/me', authController.currentUser);

export default apiV1;
