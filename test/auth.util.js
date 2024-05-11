import { prismaClient } from "../src/application/database"
import bcrypt from "bcrypt"
import { v4 as uuidV4 } from "uuid"

const addUser = async () => {
    const passwordHash = await bcrypt.hash("rahasiaBangat", 10);
    const id = uuidV4()

    const newUser = await prismaClient.user.create({
        data: {
            email: "aswad@gmail.com",
            password: passwordHash,
            id: id
        }
    })

    console.log("new user helper", newUser);
}

export {
    addUser,
}