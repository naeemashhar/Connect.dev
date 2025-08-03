const express = require("express");
const { userAuth } = require("../middlewares/auth");
const razorpayInstance = require("../utils/razorpay");
const Payment = require("../models/payment");
const { membershipAmount } = require("../utils/constant");
const {
  validateWebhookSignature,
} = require("razorpay/dist/utils/razorpay-utils");
const User = require("../models/user");

const paymentRouter = express.Router();

//creating and order
paymentRouter.post("/payment/create", userAuth, async (req, res) => {
  try {
    const { membershipType } = req.body;
    const { firstName, lastName, emailId } = req.user;

    const order = await razorpayInstance.orders.create({
      amount: membershipAmount[membershipType] * 100, //INR- in paisa
      currency: "INR",
      receipt: "receipt#1",
      notes: {
        firstName,
        lastName,
        emailId,
        membershipType: membershipType,
      },
    });

    //save it to db
    const payment = new Payment({
      userId: req.user._id,
      orderId: order.id,
      status: order.status,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
      notes: order.notes,
    });

    const savedPayment = await payment.save();

    //return order details to frontend
    res.json({ ...savedPayment.toJSON(), keyId: process.env.RAZORPAY_KEY_ID });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
});

//creating webhook-api
paymentRouter.post("/payment/webhook", async (req, res) => {
  try {
    const webhookSignature = req.get("X-Razorpay-Signature");

    const isWebhookValid = validateWebhookSignature(
      JSON.stringify(req.body), //1
      webhookSignature, //2
      process.env.RAZORPAY_WEBHOOK_SECRET //3
    );

    if (!isWebhookValid) {
      console.log("Invalid Webhook Signature");
      return res.status(400).json({ msg: "Webhook signature is invalid!" });
    }

    //update payment-status in db (success)
    const paymentDetails = req.body.payload.payment.entity;
    const payment = await Payment.findOne({
      orderId: paymentDetails.order._id,
    });
    payment.status = paymentDetails.status;

    await payment.save();

    //update user as premium
    const user = await User.findOne({ _id: payment.userId });
    user.isPremium = true;
    user.membershipType = payment.notes.membershipType;

    await user.save();

    /* if (req.body.event == "payment.captured") {
    }
    if (req.body.event == "payment.failed") {
    } */

    //return success to razorpay
    return res.status(200).json({ msg: "Webhook received successfully!" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
});

module.exports = paymentRouter;
