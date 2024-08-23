const express = require("express");
const zod = require("zod");
const { authmiddleware } = require("../middleware/authmiddleware");
const { Account } = require("../model/accountSchema");
const { User } = require("../model/userSchema");
const { mongoose } = require("mongoose");
const router = express.Router();

// user to get their balance

router.get("/balance", authmiddleware, async (req, res) => {
  const account = await Account.findOne({ userId: req.userId });
  if (!account) {
    res.status(400).json({
      err,
    });
  }

  res.json({
    balance: account.balance,
  });
});

// transfer money to another account

router.post("/transfer",authmiddleware, async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { amount, to } = req.body;

    const account = await Account.findOne({ userId: req.userId }).session(
      session
    );

    if(!account){
        await session.abortTransaction()
        return res.status(400).json({
            message:"Recipient account not found"
        })
    }
    if ( account.balance < amount) {
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
      { $inc: { balance: -amount } }
    ).session(session);

    await Account.updateOne(
      { userId: to },
      { $inc: { balance: amount } }
    ).session(session);

    await session.commitTransaction();
    res.json({
      message: "Transfer successful",
    });
  } catch (error) {
    await session.abortTransaction();
    res.status(500).json({
      message: "An error occurred during the transfer",
      error: error.message,
    });
  } finally {
    session.endSession(); 
  }
});

module.exports = router;
