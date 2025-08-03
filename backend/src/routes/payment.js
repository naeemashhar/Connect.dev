const express = require("express");
const { userAuth } = require("../middlewares/auth");
const razorpayInstance = require("../utils/razorpay");
const Payment = require("../models/payment");
const { membershipAmount } = require("../utils/constant");
const {
  validateWebhookSignature,
} = require("razorpay/dist/utils/razorpay-utils");
const User = require("../models/user");

const crypto = require("crypto");


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
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
    const webhookSignature = req.get("X-Razorpay-Signature");
    const body = req.body; // raw Buffer

    const expectedSignature = crypto
      .createHmac("sha256", webhookSecret)
      .update(body)
      .digest("hex");

    if (expectedSignature !== webhookSignature) {
      console.log("❌ Invalid Webhook Signature");
      return res.status(400).json({ msg: "Webhook signature is invalid!" });
    }

    const parsedBody = JSON.parse(body); // Since it's raw, parse manually
    const paymentDetails = parsedBody.payload.payment.entity;

    const payment = await Payment.findOne({
      orderId: paymentDetails.order_id, // ✅ use `order_id` (not `order._id`)
    });

    if (!payment) {
      return res.status(404).json({ msg: "Payment not found" });
    }

    payment.status = paymentDetails.status;
    await payment.save();

    const user = await User.findById(payment.userId);
    user.isPremium = true;
    user.membershipType = payment.notes.membershipType;

    await user.save();

    console.log("✅ Webhook processed successfully");
    return res.status(200).json({ msg: "Webhook received successfully!" });
  } catch (error) {
    console.error("Webhook Error:", error);
    return res.status(500).json({ msg: error.message });
  }
});


module.exports = paymentRouter;
