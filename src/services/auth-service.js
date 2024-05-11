import { prismaClient } from "../application/database.js";
import { generateAccessToken, generateRefreshToken } from "../application/security.js";
import ResponseError from "../commons/response-error.js";
import { loginValidation, registerValidation } from "../validations/auth-validation.js"
import validate from "../validations/validation.js"
import bcrypt from "bcrypt"
import { v4 as uuidV4 } from "uuid"

const register = async (request) => {

    const newUser = validate(registerValidation, request);

    const emailAlreadyExist = await prismaClient.user.count({
        where: {
            email: newUser.email
        }
    })

    if (emailAlreadyExist >= 1) {
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

const login = async (request) => {
    const userLogin = validate(loginValidation, request)

    const userExist = await prismaClient.user.findFirst({
        where: {
            email: userLogin.email
        }
    });

    if (!userExist) {
        throw new ResponseError(401, "Email or credential invalid")
    }

    const isValidPassword = await bcrypt.compare(userLogin.password, userExist.password)

    if (!isValidPassword) {
        throw new ResponseError(401, "Email or credential invalid")
    }

    const accessToken = generateAccessToken({
        email: userExist.email,
        id: userExist.id
    })

    const refreshToken = generateRefreshToken({
        email: userExist.email,
        id: userExist.id
    })

    return {
        access_token: accessToken,
        refresh_token: refreshToken,
    }

}

const currentUser = async (request) => {
    // console.log("request user", request)

    return await prismaClient.user.findFirst({
        where: {
            email: request.user.email
        },
    })
}

export default {
    register,
    login,
    currentUser,
}