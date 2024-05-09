import authService from "../services/auth-service.js"

const register = async (req, res, next) => {
    try {
        const result = await authService.register(req.body)

        res.status(201).json({
            status: true,
            message: 'Registration successfully.',
            data: result
        })

    } catch (error) {
        next(error)
    }
}


export default {
    register
}