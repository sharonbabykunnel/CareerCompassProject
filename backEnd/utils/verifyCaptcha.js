import axios from 'axios';

const verifyCaptcha = async (captcha) => {
    return await axios.post(
      `https://recaptchaenterprise.googleapis.com/v1/projects/careercompass-1719237393279/assessments?key=AIzaSyDS9Z3s_qVRfFPJVg4vX7F8hIrtIwXuMmA`,
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