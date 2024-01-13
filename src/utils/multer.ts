import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  
  destination: function (req, file, cb) {
    const pathupload = path.join(__dirname, '..', 'public', 'image');
    cb(null, pathupload);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.jpg');
  },
});



const upload = multer({
  storage: storage,
  limits: { fileSize: 5242880 }
});

export default upload;
