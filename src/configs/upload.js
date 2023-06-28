import {dirname,resolve} from 'path';
import multer from 'multer';
import crypto from 'crypto'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const TMP_FOLDER=resolve(__dirname,"..","..","tmp")
const UPLOADS_FOLDER=resolve(TMP_FOLDER,"uploads")


const MULTERCONFIG ={
storage:multer.diskStorage({
    destination:TMP_FOLDER,
    filename(req,file,cb){
        const fileHash=crypto.randomBytes(10).toString("hex")
        const fileName= `${fileHash}-${file.originalname}`
        return cb(null,fileName)
    }
})
}

export {
    TMP_FOLDER,
    UPLOADS_FOLDER,
    MULTERCONFIG
}