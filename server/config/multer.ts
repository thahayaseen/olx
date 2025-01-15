import multer from 'multer'
// import path from 'path'
// const uploadDir = path.join(__dirname, 'uploads');
import storage from './cloudinary';

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, uploadDir);
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + '-' + file.originalname); 
//     }
// });
const upload = multer({ storage });
console.log('comfdple');

export default upload