import supertest from "supertest"
import { prismaClient } from "../src/application/database"
import web from "../src/application/web"

describe('POST /api/v1/register', () => {
    afterEach(async () => {
        await prismaClient.user.deleteMany({
            where: {
                email: "aswad@gmail.com"
            }
        })
    })

    it('should can register new user', async () => {
        // average
        const newUserRequest = {
            // name: "Hajar Aswad",
            email: "aswad@gmail.com",
            password: "rahasiabangat"
        }

        // act
        const result = await supertest(web)
            .post('/api/v1/register')
            .send(newUserRequest)

        // assert
        expect(result.body.message).toEqual("Registration successfully.")
        expect(result.status).toEqual(201)
        expect(result.body.status).toEqual(true)
    });

})