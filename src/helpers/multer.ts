import multer from 'multer';
import path from 'path';
import { Request } from 'express';


const storage = multer.diskStorage({
    destination: function (req: Request, file: any, cb: any) {
        cb(null, '/home/leri/Documentos/play-series-animes-webstreaming-backend-leri/users-api/uploads')
    },
    filename: function (req: Request, file: any, cb: any) {
        cb(null, req.params.id + Date.now() + path.extname(file.originalname))
    }
})


const fileFilter = (req: Request, file: any, cb: any) => {
    console.log(file)
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "image/jpg") {
        return cb(null, true)
    } else {
        return cb("Tipo de arquivo não aceito", false)
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fieldSize: 1024 * 1024 * 5, // 5MB  
    },
    fileFilter: fileFilter
})

export { upload };