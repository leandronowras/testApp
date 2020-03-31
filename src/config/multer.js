import multer from 'multer';
import crypto from 'crypto'; // ja vem no node serve para gerar caracteres aleatorios
import { extname, resolve } from 'path'; // extname retorna qual a extensao do arquivo e resolve para percorrer um path

export default {
    storage: multer.diskStorage({
        // como os arquivos vao ser armazenados
        destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
        filename: (req, file, cb) => {
            crypto.randomBytes(16, (err, res) => {
                if (err) return cb(err);

                return cb(
                    null,
                    res.toString('hex') + extname(file.originalname)
                );
            });
        },
    }),
};
