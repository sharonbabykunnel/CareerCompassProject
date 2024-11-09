import nodemailer from "nodemailer";
import config from "../../config.js";

const sendOtp = async (email, otp) => {
    try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: config.user,
        pass: config.pass,
      },
    });
    const mailOptions = {
      from: config.user,
      to: email,
      subject: "Verify your Signup",
      text: `your otp id ${otp}`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        req.session.user.otp = otp;
      }
    });
  } catch (error) {
    throw error;
  }
};

export default sendOtp;
