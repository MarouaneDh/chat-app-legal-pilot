exports.postUser = async (req, res) => {
    try {
      const newUser = new User({ ...req.body });
      const response = await newUser.save();
      res.send({ response: response, message: "User was saved" });
    } catch (error) {
      console.log(error);
      res.status(400).send({ message: "not able to save user" });
    }
  };
  
  exports.getAllUsers = async (req, res) => {
    try {
      const result = await User.find();
      res.send({ response: result, message: "got Users with success" });
    } catch (error) {
      res.status(400).send({ message: "can't get user" });
    }
  };
  
  exports.getUser = async (req, res) => {
    try {
      const result = await User.findOne({ _id: req.params.id });
      res.send({ response: result, message: "got User with success" });
    } catch (error) {
      res.status(400).send({ message: "there is no user with this id" });
    }
  };
  
  exports.deleteUser = async (req, res) => {
    try {
      const result = await User.deleteOne({ _id: req.params.id });
      result.n
        ? res.send({ response: "user was deleted" })
        : res.send("there is no user with this id");
      res.send("deleted");
    } catch (error) {
      res.send("user wasn't deleted");
    }
  };
  
  exports.putUser = async (req, res) => {
    try {
      const result = await User.updateOne(
        { _id: req.params.id },
        { $set: { ...req.body } }
      );
      console.log(result);
      result.nModified
        ? res.send({ message: "user updated successfully" })
        : res.send({ message: "the user has already been given this update" });
    } catch (error) {
      res
        .status(400)
        .send({ message: "there is no user with this id to be updated" });
    }
  };