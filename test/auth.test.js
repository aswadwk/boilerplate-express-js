import supertest from 'supertest';
import prismaClient from '../src/application/database.js';
import web from '../src/application/web.js';
import addUser from './auth.util.js';

describe('Authentication', () => {
    afterEach(async () => {
        await prismaClient.user.deleteMany({
            where: {
                email: 'aswad@gmail.com',
            },
        });
    });

    describe('POST /api/v1/register', () => {
        it('should can register new user', async () => {
            // average
            const newUserRequest = {
                // name: "Hajar Aswad",
                email: 'aswad@gmail.com',
                password: 'rahasiaBangat',
            };

            // act
            const result = await supertest(web)
                .post('/api/v1/register')
                .send(newUserRequest);

            // assert
            expect(result.body.message).toEqual('Registration successfully.');
            expect(result.status).toEqual(201);
            expect(result.body.status).toEqual(true);
        });

        it('should can not register new user with same email', async () => {
            // arrange
            await addUser();

            const newUserRequest = {
                email: 'aswad@gmail.com',
                password: 'rahasiaBangat',
            };
            await supertest(web)
                .post('/api/v1/register')
                .send(newUserRequest);

            // act
            const result = await supertest(web)
                .post('/api/v1/register')
                .send(newUserRequest);

            // assert
            expect(result.body.message).toEqual('Email already Exists.');
            expect(result.status).toEqual(400);
            expect(result.body.status).toEqual(false);
        });

        it('should can not register new user without email', async () => {
            // arrange
            const newUserRequest = {
                password: 'rahasiaBangat',
            };

            // act
            const result = await supertest(web)
                .post('/api/v1/register')
                .send(newUserRequest);

            // assert
            expect(result.body.message).toEqual('email is required');
            expect(result.status).toEqual(400);
            expect(result.body.status).toEqual(false);
        });

        it('should can not register new user without password', async () => {
            // arrange
            const newUserRequest = {
                email: 'aswad@gmail.com',
            };

            // act
            const result = await supertest(web)
                .post('/api/v1/register')
                .send(newUserRequest);

            // assert
            expect(result.body.message).toEqual('password is required');
            expect(result.status).toEqual(400);
            expect(result.body.status).toEqual(false);
        });
    });

    describe('POST /api/v1/login', () => {
        it('should can login', async () => {
            // average
            await addUser();

            const userLogin = {
                email: 'aswad@gmail.com',
                password: 'rahasiaBangat',
            };

            // act
            const result = await supertest(web)
                .post('/api/v1/login')
                .send(userLogin);

            expect(result.status).toEqual(200);
            expect(result.body.status).toEqual(true);
            expect(result.body.message).toEqual('Login successfully.');
            expect(result.body.data.access_token).toBeDefined();
            expect(result.body.data.refresh_token).toBeDefined();
        });

        it('should can not login with invalid email', async () => {
            // arrange
            const userLogin = {
                email: 'xxxx@gmail.com',
                password: 'rahasiaBangat',
            };

            // act

            const result = await supertest(web)
                .post('/api/v1/login')
                .send(userLogin);

            // assert
            expect(result.status).toEqual(401);
            expect(result.body.status).toEqual(false);
            expect(result.body.message).toEqual('Email or credential invalid');
        });

        it('should can not login with invalid password', async () => {
            // arrange
            await addUser();

            const userLogin = {
                email: 'aswad@gmail.com',
                password: 'rahasianih',
            };

            // act
            const result = await supertest(web)
                .post('/api/v1/login')
                .send(userLogin);

            // assert
            expect(result.status).toEqual(401);
            expect(result.body.status).toEqual(false);
            expect(result.body.message).toEqual('Email or credential invalid');
        });
    });

    describe('GET /api/v1/me', () => {
        it('should can get current user', async () => {
            // arrange
            // add user
            const userLogin = {
                email: 'aswad@gmail.com',
                password: 'rahasiaBangat',
            };

            await addUser();

            const loginResult = await supertest(web)
                .post('/api/v1/login')
                .send(userLogin);

            // act
            const result = await supertest(web)
                .get('/api/v1/me')
                .set('Authorization', `Bearer ${loginResult.body.data.access_token}`);

            // assert

            expect(result.status).toEqual(200);
            expect(result.body.status).toEqual(true);
            expect(result.body.message).toEqual('User data retrieved successfully.');
        });
    });
});
