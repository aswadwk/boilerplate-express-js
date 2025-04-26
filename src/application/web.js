import express from 'express';
import publicApi from '../routes/api-public.js';
import errorMiddleware from '../middlewares/error-middleware.js';

const web = express();

web.use(express.json());

web.use(publicApi);

web.use(errorMiddleware);

export default web;
