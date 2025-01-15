import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: 'da2cscj5g',
  api_key: process.env.API_KEY_CLOUDINARY,
  api_secret: process.env.SECRET_KEY_CLOUDINARY,
});
console.log(process.env.API_KEY_CLOUDINARY,process.env.SECRET_KEY_CLOUDINARY);

interface ExtendedParams {
  folder?: string;
  allowed_formats?: string[];
}

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder:"upload",
    allowed_formats: ['jpg', 'png', 'jpeg'],
  } as ExtendedParams, 
});
console.log('comple');

export default storage;
