const nodemailer = require("nodemailer");
require("dotenv").config();

// creating transporter object for nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_MAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

//setting mail options
const mailOptions = (otp, user, email) => {
  return {
    from: "Punchbiz",
    to: email,
    subject: "OTP for Reset Passowrd",
    html: ` <div
    style="
      border-radius: 10px;
      
      padding: 16px;
      font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
      background-image: linear-gradient(
        to right bottom,
        rgb(1, 175, 255),
        white,
        rgba(2, 133, 255, 0.788)
      );
    "
  >
    <h1 style="text-align: center; color: rgba(2, 133, 255, 0.788)">
      Punchbiz
    </h1>
    <p style="font-style: italic">
      Hey ${user} , You have requested for Resetting the password
      
    </p>
    <p>The 4 digit <b>OTP</b> is</p>
    <h2 style="color: rgb(2, 133, 255)">${otp}</h2>
    <hr style="color: white" />
    <p>Enter the above OTP to reset the password</p>
    <p>OTP will be valid for only 2 minutes</p>
  </div>`,
  };
};

const successSignupMailOptions = (user, email) => {
  return {
    from: "Punchbiz",
    to: email,
    subject: "EXIT- Signup Successful",
    html: ` <div
    style="
      border-radius: 10px;
      
      padding: 16px;
      font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
      background-image: linear-gradient(
        to right bottom,
        rgb(1, 175, 255),
        white,
        rgba(2, 133, 255, 0.788)
      );
    "
  >
    <h1 style="text-align: center; color: rgba(2, 133, 255, 0.788)">
      Exit
    </h1>
    <p style="font-style: italic">
      Hey ${user} , Thank you for signing up to Exit
    </p>
    <hr style="color: white" />
    <p>Your account has been successfully created with email ${email}</p>
    <p>We hope you find our Product useful.</p>
    <h3>Happy Exercising</h3>
  </div>`,
  };
};
module.exports = { transporter, mailOptions, successSignupMailOptions };
