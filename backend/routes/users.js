const express = require("express");
const router = express.Router();
const User = require("../models/User");
const controllers = require("../controllers/user.controllers");

//test routing
router.get("/hellousers", (req, res) => {
  res.send("routing for users OK");
});

//POST
//user posting
//PATH: http://localhost:5000/api/user/
//params Body
router.post("/", controllers.postUser);

//GET
//getting all users
//PATH:http://localhost:5000/api/user/
router.get("/", controllers.getAllUsers);

//GET
//getting user by id
//PATH:http://localhost:5000/api/user/:id
//params id
router.get("/:id", controllers.getUser);

//DELETE
//deleting a user by id
//PATH:http://localhost:5000/api/user/:id
//params id
router.delete("/:id", controllers.deleteUser);

//PUT
//updating a user by id
//PATH:http://localhost:5000/api/user/:id
//params id body
router.put("/:id", controllers.putUser);

module.exports = router;