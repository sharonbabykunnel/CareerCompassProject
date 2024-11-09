import config from './../../config.js';

const constructURL = (result) => {
    return `https://${config.aws_s3_bucket}.s3.${config.aws_region}.amazonaws.com/${encodeURIComponent(result.newFileName)}`;
}

export default constructURL;