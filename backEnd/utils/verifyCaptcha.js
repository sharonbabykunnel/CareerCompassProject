import axios from 'axios';

const verifyCaptcha = async (captcha) => {
    return await axios.post(
      process.env.RECAPTCHA_URL,
      {
        event: {
          token: captcha,
          expectedAction: process.env.RECAPTCHA_ACTION,
          siteKey: process.env.RECAPTCHA_SECRET,
        },
      }
    );
}

export default verifyCaptcha