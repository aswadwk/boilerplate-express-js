/* eslint-disable prefer-destructuring */
/* eslint-disable no-await-in-loop */
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
    const output = {
        file_name: input.file_name,
        file_path: input.file_path,
        smart_scan_id: input.smart_scan_id,
        contract_number: input.contract_number,
        cabang: input.cabang,
        no_kk: '',
        nama_kk: '',
        address: '',
        rt_rw: '',
        kelurahan: '',
        kecamatan: '',
        kabupaten: '',
        province: '',
        postal_code: '',
        table: [],
    };

    // Extract no_kk
    input.forEach((item) => {
        if (item.label === 'no_kk') {
            output.no_kk = item.ocr_text.replace('No ', '');
        }

        if (item.label === 'nama_kk') {
            output.nama_kk = item.ocr_text;
        }

        if (item.label === 'alamat') {
            output.address = item.ocr_text;
        }

        if (item.label === 'desa_kelurahan') {
            output.kelurahan = item.ocr_text;
        }

        if (item.label === 'kabupaten') {
            output.kabupaten = item.ocr_text;
        }

        if (item.label === 'kecamatan') {
            output.kecamatan = item.ocr_text;
        }

        if (item.label === 'kode_pos') {
            output.postal_code = item.ocr_text;
        }

        if (item.label === 'provinsi') {
            output.province = item.ocr_text;
        }

        if (item.label === 'rt_rw') {
            output.rt_rw = item.ocr_text;
        }
    });

    // Extract NIK, nama_lengkap, and status_perkawinan
    const nikArray = [];
    const namaArray = [];
    const gendersArray = [];
    const podArray = [];
    const dobsArray = [];
    const religionArray = [];
    const educationArray = [];
    const jobArray = [];

    const statusArray = [];
    const relationArray = [];
    const citizenshipArray = [];
    const fatherArray = [];
    const motherArray = [];

    input.forEach((item) => {
        if (item.label === 'table' && item.cells) {
            item.cells.forEach((cell) => {
                if (cell.label === 'NIK') {
                    nikArray.push({ row: cell.row, value: cell.text });
                }

                if (cell.label === 'nama_lengkap') {
                    namaArray.push({ row: cell.row, value: cell.text });
                }

                if (cell.label === 'jenis_kelamin') {
                    gendersArray.push({ row: cell.row, value: cell.text });
                }

                if (cell.label === 'tempat_lahir') {
                    podArray.push({ row: cell.row, value: cell.text });
                }

                if (cell.label === 'tanggal_lahir') {
                    dobsArray.push({ row: cell.row, value: cell.text.trim().replaceAll('-', '/') });
                }

                if (cell.label === 'pendidikan') {
                    educationArray.push({ row: cell.row, value: cell.text });
                }

                if (cell.label === 'jenis_pekerjaan') {
                    jobArray.push({ row: cell.row, value: cell.text });
                }

                if (cell.label === 'status_perkawinan') {
                    statusArray.push({ row: cell.row, value: cell.text });
                }

                if (cell.label === 'status_hubungan') {
                    relationArray.push({ row: cell.row, value: cell.text });
                }

                if (cell.label === 'kewarganegaraan') {
                    citizenshipArray.push({ row: cell.row, value: cell.text });
                }

                if (cell.label === 'agama') {
                    religionArray.push({ row: cell.row, value: cell.text });
                }

                if (cell.label === 'ortu_ayah') {
                    fatherArray.push({ row: cell.row, value: cell.text });
                }

                if (cell.label === 'ortu_ibu') {
                    motherArray.push({ row: cell.row, value: cell.text });
                }
            });
        }
    });

    // Combine NIK, nama_lengkap, and status_perkawinan into table array
    nikArray.forEach((nik) => {
        const name = namaArray.find((nama) => nama.row === nik.row);
        const gender = gendersArray.find((g) => g.row === nik.row);
        const dob = dobsArray.find((d) => d.row === nik.row);
        const pod = podArray.find((p) => p.row === nik.row);
        const religion = religionArray.find((r) => r.row === nik.row);
        const education = educationArray.find((e) => e.row === nik.row);
        const job = jobArray.find((j) => j.row === nik.row);
        const status = statusArray.find((s) => s.row === nik.row);
        const relation = relationArray.find((r) => r.row === nik.row);
        const citizenship = citizenshipArray.find((c) => c.row === nik.row);
        const father = fatherArray.find((f) => f.row === nik.row);
        const mother = motherArray.find((m) => m.row === nik.row);

        output.table.push({
            kk_no_gros: output.no_kk,
            kk_no: output.no_kk,
            name: name ? name.value : '',
            nik_gros: nik.value,
            nik: nik.value,
            gender: gender ? gender.value : '',
            date_of_birth: dob ? dob.value : '',
            place_of_birth: pod ? pod.value : '',
            religion: religion ? religion.value : '',
            education: education ? education.value : '',
            profession: job ? job.value : '',
            marital_status: status ? status.value : '',
            relation_status: relation ? relation.value : '',
            // Todo status on family card
            citizenship: citizenship ? citizenship.value : '',
            father_name: father ? father.value : '',
            mother_name: mother ? mother.value : '',

            father_on_family_card: output.nama_kk,
            address: output.address,
            rt_rw: output.rt_rw,
            kelurahan: output.kelurahan,
            kecamatan: output.kecamatan,
            kabupaten: output.kabupaten,
            province: output.province,
            postal_code: output.postal_code,
            file_name: output.file_name,
            file_path: output.file_path,
            smart_scan_id: output.smart_scan_id,
            contract_number: output.contract_number,
            cabang: output.cabang,
        });
    });

    // check if nikArray is empty
    if (nikArray.length === 0) {
        output.table.push({
            kk_no_gros: output.no_kk,
            kk_no: output.no_kk,
            name: '',
            nik_gros: '',
            nik: '',
            gender: '',
            date_of_birth: '',
            place_of_birth: '',
            religion: '',
            education: '',
            profession: '',
            marital_status: '',
            relation_status: '',
            // Todo status on family card
            citizenship: '',
            father_name: '',
            mother_name: '',
            father_on_family_card: output.nama_kk,
            address: output.address,
            rt_rw: output.rt_rw,
            kelurahan: output.kelurahan,
            kecamatan: output.kecamatan,
            kabupaten: output.kabupaten,
            province: output.province,
            postal_code: output.postal_code,
            file_name: output.file_name,
            file_path: output.file_path,
            smart_scan_id: output.smart_scan_id,
            contract_number: output.contract_number,
            cabang: output.cabang,
        });
    }
    // console.log(result);
    return output;
}

function insertData(input) {
    return prismaClient.familyCard.create({
        data: {
            kk_no_gros: input.kk_no_gros,
            kk_no: input.kk_no,
            number: input.number_kk,
            contract_number: input.contract_number,
            cabang: input.cabang,
            name: input.name,
            nik_gros: input.nik_gros,
            nik: input.nik,
            gender: input.gender,
            date_of_birth: input.date_of_birth,
            place_of_birth: input.place_of_birth,
            religion: input.religion,
            education: input.education,
            profession: input.profession,
            marital_status: input.marital_status,
            status_on_family_card: input.relation_status,
            citizenship: input.citizenship,
            father_name: input.father_name,
            mother_name: input.mother_name,
            father_on_family_card: input.father_on_family_card,
            address: input.address,
            rt_rw: input.rt_rw,
            kelurahan: input.kelurahan,
            kecamatan: input.kecamatan,
            kabupaten: input.kabupaten,
            province: input.province,
            postal_code: input.postal_code,
            file_name: input.file_name,
            file_path: input.file_path,
            smart_scan_id: input.smart_scan_id,
        },
    });
}

const prosesData = async (req, res, next) => {
    try {
        const smartScans = await prismaClient.smartScan.findMany({});

        const results = [];

        for (const smartScan of smartScans) {
            const predictions = JSON.parse(smartScan.response_json).result[0].prediction;

            predictions.file_name = smartScan.file_name;
            const fileName = smartScan.file_name.split('.')[0];

            predictions.file_path = smartScan.file_path;
            predictions.smart_scan_id = smartScan.id;
            predictions.contract_number = smartScan.file_name.split('.')[0];
            predictions.cabang = `${fileName.substring(0, 3)}000`;
            results.push(manipulateData(predictions));
        }

        let totalData = 0;
        for (const result of results) {
            totalData += 1;
            for (const item of result.table) {
                item.number_kk = totalData.toString();
                await insertData(item);
            }
        }

        res.status(200).json({
            status: true,
            message: 'Data retrieved successfully.',
            data: true,
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
