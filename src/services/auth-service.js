import { prismaClient } from "../application/database.js";
import ResponseError from "../commons/response-error.js";
import { registerValidation } from "../validations/auth-validation.js"
import validate from "../validations/validation.js"
import bcrypt from "bcrypt"
import { v4 as uuidV4 } from "uuid"

const register = async (request) => {

    const newUser = validate(registerValidation, request);

    const emailAlreadyExist = await prismaClient.user.count()

    if (emailAlreadyExist === 1) {
        throw new ResponseError(400, "Email already Exists.")
    }

    newUser.password = await bcrypt.hash(newUser.password, 10);
    newUser.id = uuidV4()
    console.log(newUser);

    return await prismaClient.user.create({
        data: newUser,
        select: {
            email: true,
            // name: true,
        }
    });
}

export default {
    register,
}