/* eslint-disable no-restricted-syntax */
import prismaClient from '../application/database.js';
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

function manipulateData(input) {
    console.log(input);

    const output = {
        no_kk: '',
        table: [],
    };

    // Extract no_kk
    input.forEach((item) => {
        if (item.label === 'no_kk') {
            output.no_kk = item.ocr_text.replace('No ', '');
        }
    });

    // Extract NIK, nama_lengkap, and status_perkawinan
    const nikArray = [];
    const namaArray = [];
    const statusArray = [];
    const relationArray = [];
    const agama = [];
    const dobs = [];

    input.forEach((item) => {
        if (item.label === 'table' && item.cells) {
            item.cells.forEach((cell) => {
                if (cell.label === 'NIK') {
                    nikArray.push(cell.text);
                } else if (cell.label === 'nama_lengkap') {
                    namaArray.push(cell.text);
                } else if (cell.label === 'status_perkawinan') {
                    statusArray.push(cell.text);
                } else if (cell.label === 'status_hubungan') {
                    relationArray.push(cell.text);
                } else if (cell.label === 'agama') {
                    agama.push(cell.text);
                } else if (cell.label === 'tanggal_lahir') {
                    dobs.push(cell.text);
                }
            });
        }
    });

    // Combine NIK, nama_lengkap, and status_perkawinan into table array
    nikArray.forEach((nik, index) => {
        output.table.push({
            NIK: nik,
            nama_lengkap: namaArray[index] || '', // Handle potential mismatch in array lengths
            status_perkawinan: statusArray[index] || '', // Handle potential mismatch in array lengths
            status_hubungan: relationArray[index] || '', // Handle potential mismatch in array lengths
            agama: agama[index] || '', // Handle potential mismatch in array lengths
            dob: dobs[index] || '', // Handle potential mismatch in array lengths
        });
    });

    // Convert output object to array
    const result = [output];

    // Log the result
    console.log(result);
    return result;
}

const prosesData = async (req, res, next) => {
    try {
        const smartScans = await prismaClient.smartScan.findMany({});

        // for (const smartScan of smartScans) {
        //     predictions = JSON.parse(smartScan.response_json).result[0].prediction
        // }

        console.log(smartScans.length);

        res.status(200).json({
            status: true,
            message: 'Data retrieved successfully.',
            // data: JSON.parse(smartScans[1].response_json).result[0].prediction,
            data: manipulateData(JSON.parse(smartScans[1].response_json).result[0].prediction),
        });
    } catch (error) {
        next(error);
    }
};

export default {
    register,
    login,
    currentUser,
    prosesData,
};
