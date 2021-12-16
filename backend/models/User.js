const mongoose = require("mongoose");

const schema = mongoose.Schema;

const userSchema = new schema({
  role: {
    type: String,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  password: {
    type: String,
  },
  gender: {
    type: String,
  },
  email: {
    type: String,
  },
  country: {
    type: String,
  },
  city: {
    type: String,
  },
  
});
module.exports = User = mongoose.model("user", userSchema);