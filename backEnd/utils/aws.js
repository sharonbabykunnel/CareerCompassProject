import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import config from "./../../config.js";

const uploadToS3 = async (file) => {
  try {
    const client = new S3Client({
      region: config.aws_region,
      credentials: {
        accessKeyId: config.aws_acces_key,
        secretAccessKey: config.aws_secret_key,
      },
    });

    const newFileName = `${Date.now().toString()}.${
      file.mimetype.split("/")[1]
    }`;
    const params = {
      Bucket: config.aws_s3_bucket,
      Key: newFileName,
      Body: file.data,
    };

    const command = new PutObjectCommand(params);
    const result = await client.send(command);

    if (result) {
      return newFileName;
    }
  } catch (error) {
    console.error(error);
    throw error; 
  }
};

export default uploadToS3;
