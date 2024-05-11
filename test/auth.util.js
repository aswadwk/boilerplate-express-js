import bcrypt from 'bcrypt';
import { v4 as uuidV4 } from 'uuid';
import prismaClient from '../src/application/database.js';

const addUser = async () => {
    const passwordHash = await bcrypt.hash('rahasiaBangat', 10);
    const id = uuidV4();

    return prismaClient.user.create({
        data: {
            email: 'aswad@gmail.com',
            password: passwordHash,
            id,
        },
    });
};

export default addUser;
