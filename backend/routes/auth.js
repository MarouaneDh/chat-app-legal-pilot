const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const isAuth = require("../middlewares/isAuth");
const {
  validator,
  loginRules,
  registerRules,
} = require("../middlewares/bodyValidator");
const User = require("../models/User");

router.post("/register", registerRules(), validator, async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    gender,
    country,
    city,
    role,
  } = req.body;
  try {
    //find if user exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).send({ errors: [{ msg: "user already exists" }] });
    }
    //create a new user
    user = new User({
      firstName,
      lastName,
      email,
      password,
      gender,
      country,
      city,
      role,
    });
    //hash password
    const salt = 10;
    const hashedPassword = await bcrypt.hash(password, salt);
    user.password = hashedPassword;
    //save the new user
    await user.save();

    //sign in the user
    const payload = {
      _id: user._id,
    };

    const token = await jwt.sign(payload, process.env.secret);

    res.status(200).send({ msg: "Registered with success", user, token });
  } catch (error) {
    console.log(error);
    res.status(500).send({ errors: [{ msg: "server error" }] });
  }
});
router.post("/login", loginRules(), validator, async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({
        errors: [{ msg: "either your password or your email are false" }],
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({
        errors: [{ msg: "either your password or your email are false" }],
      });
    }
    //sign in the user
    const payload = {
      _id: user._id,
    };

    const token = await jwt.sign(payload, process.env.secret);

    res.send({ msg: "logged in with success", user, token });
  } catch (error) {
    res.status(500).send({ errors: [{ msg: "Server error" }] });
  }
});

router.get("/me", isAuth, (req, res) => {
  res.status(200).send({ user: req.user });
});

module.exports = router;