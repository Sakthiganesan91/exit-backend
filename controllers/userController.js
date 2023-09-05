const bcrypt = require("bcrypt");
const otpGenerator = require("otp-generator");
const { transporter, mailOptions } = require("../config/transport");
const User = require("../models/user");

const getUserById = async (req, res) => {
  const _id = req.params.id;

  try {
    const user = await User.findOne({ _id });
    res.status(201).json({
      user,
    });
  } catch (e) {
    res.status(404).json({
      error: e.message,
    });
  }
};

const forgotPassword = async (req, res) => {
  const email = req.body.email;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({
        message: `User not found`,
        success: false,
      });
      return;
    }

    const otp = otpGenerator.generate(4, {
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });

    user.otpPassword = `${otp} ${Date.now() + 120000}`;
    await user.save();

    const mail = mailOptions(otp, user.username, email);
    transporter.sendMail(mail, (info, error) => {
      if (error) {
        throw new Error("Failed to send Email");
      }
    });

    res.json({
      message: "Email sent successfully",
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
      success: false,
    });
  }
};

const otpVerification = async (req, res) => {
  const otp = req.body.otp;
  const email = req.body.email;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({
        message: `User not found`,
      });
      return;
    }

    const userOtp = parseInt(user.otpPassword.split(" ")[0]);
    const time = parseInt(user.otpPassword.split(" ")[1]);

    if (userOtp === otp && Date.now() < time) {
      res.status(201).json({
        message: "OTP Verified successfully",
        success: true,
      });
    } else {
      throw new Error("Invalid OTP");
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
      success: false,
    });
  }
};

const changePassword = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("User does not exist");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user.password = hashedPassword;

    await user.save();
    res
      .status(201)
      .json({ message: "Password Changed Successfully", success: true });
  } catch (e) {
    res.status(400).json({
      message: e.message,
    });
  }
};

module.exports = {
  getUserById,
  forgotPassword,
  otpVerification,
  changePassword,
};
