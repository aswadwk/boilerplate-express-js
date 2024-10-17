import axios from 'axios';
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

const chat = async (req, res) => {
    const data = JSON.stringify({
        assistant_id: 'asst_g2qIz4WxULTpdHcglAneohIF',
        thread: {
            messages: [
                {
                    role: 'user',
                    content: req.body.content,
                },
            ],
        },
        stream: true,
    });

    const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://api.openai.com/v1/threads/runs',
        headers: {
            'OpenAI-Beta': 'assistants=v2',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        data,
        responseType: 'stream',
    };

    axios(config)
        .then((response) => {
            res.setHeader('Content-Type', 'text/event-stream');
            res.setHeader('Cache-Control', 'no-cache');
            res.setHeader('Connection', 'keep-alive');

            response.data.on('data', (chunk) => {
                res.write(chunk);
            });

            response.data.on('end', () => {
                res.end();
            });
        })
        .catch((error) => {
            res.status(500).json({
                status: false,
                message: error.message,
                data: null,
            });
        });
};

export default {
    register,
    login,
    currentUser,
    chat,
};
