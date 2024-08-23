const express = require("express");
const zod = require("zod");
const { authmiddleware } = require("../middleware/authmiddleware");
const { Account } = require("../model/accountSchema");
const { User } = require("../model/userSchema");
const { default: mongoose } = require("mongoose");
const router = express.Router();

// user to get their balance

router.get("/balance", authmiddleware, async (req, res) => {
  const account = await Account.findOne({ userId: req.userId });

  res.json({
    balance: account.balance,
  });
});

// transfer money to another account

router.post("/transfer", async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  const { amount, to } = req.body;
  const account = await Account.findOne({ userId: req.userId }).session(
    session
  );
  if (!account || account.balance < amount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "Insufficient balance",
    });
  }

  const toAccount = await Account.findOne({ userId: to }).session(session);
  if (!toAccount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "Invalid account",
    });
  }

  await Account.updateOne(
    { userId: req.userId },
    {
      $inc: { balance: -amount },
    }
  ).session(session);
  await Account.updateOne(
    { userId: to },
    {
      $inc: { balance: amount },
    }
  ).session(session);

  await session.commitTransaction();
  res.json({
    message: "Transfer succesfull",
  });
});

module.exports = router;
