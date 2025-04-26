/* eslint-disable import/no-extraneous-dependencies */
import dotenv from 'dotenv';
import web from './application/web.js';

dotenv.config();

web.listen(3000, () => {
    // eslint-disable-next-line no-console
    console.log('app runnning at port 3000');
});
