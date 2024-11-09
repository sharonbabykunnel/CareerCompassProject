import axios from 'axios';

const verifyCaptcha = async (captcha) => {
    return await axios.post(
      `https://recaptchaenterprise.googleapis.com/v1/projects/careercompass-1719237393279/assessments?key=AIzaSyDS9Z3s_qVRfFPJVg4vX7F8hIrtIwXuMmA`,
      {
        event: {
          token: captcha,
          expectedAction: "USER_ACTION",
          siteKey: "6LfL6f8pAAAAAEYFzYQJUXL3k8Qw7xYUvyTJjtd5",
        },
      }
    );
}

export default verifyCaptcha