import authService from '../services/auth-service.js';

const register = async (req, res, next) => {
    try {
        const result = await authService.register(req.body);

        res.status(201).json({
            status: true,
            message: 'Registration successfully.',
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const result = await authService.login(req.body);

        res.status(200).json({
            status: true,
            message: 'Login successfully.',
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const currentUser = async (req, res, next) => {
    try {
        const result = await authService.currentUser(req);

        res.status(200).json({
            status: true,
            message: 'User data retrieved successfully.',
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const chat = (req, res) => {
    res.status(200).json({
        status: true,
        message: 'Chat successfully.',
    });
};

export default {
    register,
    login,
    currentUser,
    chat,
};
