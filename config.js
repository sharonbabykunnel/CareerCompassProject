import dotenv from 'dotenv'
dotenv.config();

const config = {
  port: process.env.PORT || 5000,
  db_url: process.env.DB_URL,
  origin: process.env.ORIGIN,
  user: process.env.USER_GMAIL,
  aws_acces_key: process.env.AWS_ACCES_KEY,
  aws_secret_key: process.env.AWS_SECRET_KEY,
  aws_s3_bucket: process.env.AWS_S3_BUCKET,
  aws_region: process.env.AWS_REGION,
  jwt_secret: process.env.JWT_SECRET,
  access_secret: process.env.ACCES_SECRET,
  s3_bucket_file_url: process.env.S3_BUCKET_IMG_URL,
  site_key: process.env.SITE_KEY,
  pass: process.env.PASS,
};

export default config