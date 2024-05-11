import express from 'express';
import publicApi from '../routes/api-public.js';
import errorMiddleware from '../middlewares/error-middleware.js';
import apiV1 from '../routes/api-v1.js';

const web = express();

web.use(express.json());
web.use(publicApi);
web.use(apiV1);

web.use(errorMiddleware);

export default web;
