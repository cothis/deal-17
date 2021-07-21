import multer from 'multer';
import multerS3 from 'multer-s3';
import aws from 'aws-sdk';

const a = __dirname + '/awsconfig.json';
aws.config.loadFromPath(__dirname + '/awsconfig.json');

export default a;
