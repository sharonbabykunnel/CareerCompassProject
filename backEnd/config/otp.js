import otpGenerator from 'otp-generator'

const genarateOtp = () =>
  otpGenerator.generate(6, {
    upperCaseAlphabets: true,
    specialChars: false,
  });

export default genarateOtp