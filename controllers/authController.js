const User = require("../models/user");
const jwt = require("jsonwebtoken");
const {
  transporter,
  successSignupMailOptions,
} = require("../config/transport");

// token creation
const createToken = (_id) => {
  return jwt.sign({ _id: _id }, process.env.SECRET_KEY, {
    expiresIn: "2d",
  });
};

const login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const user = await User.login(email, password);

    const token = createToken(user._id);
    res.status(200).json({ id: user._id, token, user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const signup = async (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const age = req.body.age;
  const gender = req.body.gender;
  const height = req.body.height;
  const weight = req.body.weight;

  try {
    const user = await User.signup(
      username,
      email,
      password,
      gender,
      age,
      height,
      weight
    );
    const mail = successSignupMailOptions(user.username, email);
    transporter.sendMail(mail, (info, error) => {
      if (error) {
        throw new Error("Failed to send Email");
      }
    });

    const token = createToken(user._id);
    res.status(200).json({ id: user._id, token, user });
  } catch (err) {
    res.status(403).json({ error: err.message });
  }
};

module.exports = {
  signup,
  login,
};
