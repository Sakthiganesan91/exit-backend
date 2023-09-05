const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

/**
 * Schema
 * email
 * username
 * password
 * gender
 * age
 * height
 * weight
 */

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    minLength: 6,
  },
  gender: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
    min: 10,
  },

  height: {
    type: Number,
    min: 50,
    max: 300,
    required: true,
  },

  weight: {
    type: Number,
    min: 20,
    max: 700,
    required: true,
  },

  otpPassword: {
    type: String,
    default: 0,
  },
});

userSchema.statics.signup = async function (
  username,
  email,
  password,
  gender,
  age,
  height,
  weight
) {
  const existingUser = await this.findOne({ email });

  if (existingUser) {
    throw Error("User Already Exists");
  } else {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await this.create({
      username,
      email,
      password: hashedPassword,
      gender,
      age,
      height,
      weight,
    });

    return user;
  }
};

userSchema.statics.login = async function (email, password) {
  const existingUser = await this.findOne({
    email,
  });

  if (!existingUser) {
    throw Error("user does not exist");
  }

  const match = await bcrypt.compare(password, existingUser.password);

  if (match) {
    return existingUser;
  } else {
    throw Error("Check Password and Try Again");
  }
};

module.exports = mongoose.model("user", userSchema);

/**
 * {
    "username":"",
   "email":"@gmail.com",
   "password":"@123",
   "gender":"",
   "age":,
   "height":,
   "weight":
}
 */
