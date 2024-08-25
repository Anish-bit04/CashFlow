const express = require("express");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const { User } = require("../model/userSchema");
const { Account } = require("../model/accountSchema");
const { authmiddleware } = require("../middleware/authmiddleware");
const router = express.Router();

const signupBody = zod.object({
  username: zod.string().email(),
  firstName: zod.string(),
  lastName: zod.string().optional(),
  password: zod.string(),
});

//SignUp -->

router.post("/signup", async (req, res) => {
  const result = signupBody.safeParse(req.body);
  if (!result.success) {
    return res.status(411).json({
      message: "Invalid Input",
      errors: result.error.format(),
    });
  }

  const existingUser = await User.findOne({ username: req.body.username });

  if (existingUser) {
    return res.status(411).json({
      message: "User already exits",
    });
  }

  const user = await User.create({
    username: req.body.username,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password,
  });

  const userId = user._id;
  await Account.create({
    userId,
    balance: 1+ Math.random()*10000
  })

  const token = jwt.sign({ userId }, process.env.JWT_SECRET);
  res.status(201).json({
    message: "New User is successfully created",
    token: token,
  });
});

//Signin -->

const signinBody = zod.object({
  username: zod.string().email(),
  password: zod.string(),
});

router.post("/signin", async (req, res) => {
  const result = signinBody.safeParse(req.body);
  if (!result.success) {
    return res.status(411).json({
      message: "Invalid input",
      errors: result.error.format(),
    });
  }

  const user = await User.findOne({
    username: req.body.username,
  });

  if (!user) {
    return res.status(411).json({
      message: "User is not signedUp",
    });
  }

  const userId = user._id;
  const token = jwt.sign({ userId }, process.env.JWT_SECRET);

  res.status(200).json({
    message: "LoggedIn succesfully",
    token: token,
  });
});

// update router

const updateBody = zod.object({
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
  password: zod.string().optional(),
}); 

router.put("/", async (req, res) => {
  const { success } = updateBody.safeParse(req.body);

  if (!success) {
    res.status(411).json({
      message: "Error while updating information",
    });
  }

  await User.updateOne({ _id: req.userId }, req.body);
  res.json({
    message: "Updated successfully",
  });
});

// Route to get users

router.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";

  const users = await User.find({
    $or: [
      {
        firstName: {
          $regex: filter,$options: "i" 
        },
      },
      {
        lastName: {
          $regex: filter,$options: "i" 
        },
      },
    ],
    _id: { $ne: req.userId }
  });

  res.json({
    user: users.map((user) => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    })),
  });
});

module.exports = router;
