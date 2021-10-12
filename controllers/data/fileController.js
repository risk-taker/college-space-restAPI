import multer from "multer";
import path from 'path';
import CustomErrorHandler from '../../services/CustomErrorHandler';
import fileSchema from "../../validators/fileValidators";
import fs from 'fs';
import { File } from '../../models';


const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${Math.round(
            Math.random() * 1e9
        )}${path.extname(file.originalname)}`;
        // 3746674586-836534453.png
        cb(null, uniqueName);
    },
});

const handleMultipartData = multer({
    storage,
    limits: { fileSize: 1000000 * 5 },
}).single('myfile'); // 5mb

const fileController = {
    async file(req, res, next) {
        // Multipart form data
        handleMultipartData(req, res, async (err) => {
            if (err) {
                return next(err.message);
            }
            console.log(req.body);
            console.log(req.file);
            // console.log(req.body.myFile.path)
            // console.log(req.body.myFile);
            const filePath = req.file.path;
            // validation
            const { error } = fileSchema.validate(req.body);
            console.log(error);
            if (error) {
                // Delete the uploaded file
                fs.unlink(`${appRoot}/${filePath}`, (err) => {
                    if (err) {
                        return next(err.message);
                    }
                });
                return next(error);
                // rootfolder/uploads/filename.png
            }

            const { notes_name, desc, teacher_name } = req.body;
            let document;
            try {
                document = await File.create({
                    notes_name,
                    desc,
                    teacher_name,
                    myfile: filePath,
                });
            } catch (err) {
                return next(err);
            }
            res.status(201).json({status: 1});
        });
    },
    async getfile(req, res, next) {
        let file;

        try {
            file = await File.findOne({_id: req.params.id})
        } catch(err) {
            return next(err)
        }

        const filePath = `${__dirname}../../../${file.myfile}`;
        res.download(filePath);
    },
    async getfiles(req, res, next) {
        let files;

        try {
            files = await File.find();
        } catch(err) {
            return next(err);
        }

        res.json(files);
    }

}

export default fileController;