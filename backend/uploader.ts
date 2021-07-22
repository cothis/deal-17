import multer from 'multer';
import multerS3 from 'multer-s3';
import AWS from 'aws-sdk';
import 'dotenv-defaults/config';
import path from 'path';

const s3 = new AWS.S3({
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: 'ap-northeast-2',
});

interface MIME_TYPE_MAP {
  [prop: string]: any;
}

const MIME_TYPE_MAP: MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
  'image/gif': 'gif',
};

export const upload2 = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'deal-17',
    acl: 'public-read',
    key: function (req, file, cb) {
      cb(null, Math.floor(Math.random() * 1000).toString() + Date.now() + '.' + file.originalname.split('.').pop());
    },
  }),
  limits: {
    fileSize: 1000 * 1000 * 10,
  },
});

export const Upload = (dest: string) => {
  return multer({
    fileFilter: (req, file, cb) => {
      const isValid = !!MIME_TYPE_MAP[file.mimetype];
      const error: Error | null = isValid ? null : new Error('Invalid mime type!');
      if (!error) {
        cb(null, isValid);
      } else {
        cb(error);
      }
    },
    storage: multerS3({
      s3: s3,
      bucket: 'deal-17',
      acl: 'public-read',
      key: function (req, file, cb) {
        console.log(`target : `, path.join(dest, file.originalname));
        const ext = file.mimetype.split('/')[1];
        cb(null, path.join(dest, file.fieldname + '-' + Date.now().toString() + ext));
      },
    }),
    limits: {
      fileSize: 1000 * 1000 * 10,
    },
  });
};
