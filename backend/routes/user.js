const express = require("express");
const userRouter = require("../controller/user.controller");
const accountRouter = require("../controller/account.controller");
const router = express.Router();

router.use("/user", userRouter);
router.use('/account',accountRouter)

module.exports = router;
