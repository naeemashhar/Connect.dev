const express = require("express");
const profileRouter = express.Router();

const { userAuth } = require("../middlewares/auth");
const { validateProfileData } = require("../utils/validation");
const { validateForgotPassword } = require("../utils/validation");
const bcrypt = require("bcrypt");
const { validateDeleteProfile } = require("../utils/validation");
const User = require("../models/user");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user; //user is attached to the request object by the userAuth middleware

    res.send(user);
  } catch (error) {
    res.status(400).send("Profile Fetch Failed : " + error.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateProfileData(req)) {
      throw new Error("Invalid Edit Request");
    }

    const user = req.user; //user is attached to the request object by the userAuth middleware

    Object.keys(req.body).forEach((key) => (user[key] = req.body[key]));
    await user.save();

    res.json({
      message: `${user.firstName}, Your Profile Updated Successfully`,
      data: user,
    });
  } catch (error) {
    res.status(400).send("Profile Update Failed : " + error.message);
  }
});

profileRouter.patch("/profile/password", userAuth, async (req, res) => {
  try {
    const user = req.user;

    // Ensure user exists
    if (!user) {
      throw new Error("User not found");
    }

    await validateForgotPassword(req, user);

    user.password = await bcrypt.hash(req.body.password, 10);
    await user.save();

    res.json({
      message: "Your Password Updated Successfully",
      data: user,
    });

  } catch (error) {
    res.status(400).send("Password Update Failed: " + error.message);
  }

});

profileRouter.delete("/profile/delete", userAuth, async (req, res) => {
  try {
    validateDeleteProfile(req);

    const user = await User.findByIdAndDelete(req.user._id);

    if (!user) {
      throw new Error("User not found");
    }

    res.json({
      message: `${user.firstName}, Your Profile Deleted Successfully`,
    });

  } catch (error) {
    res.status(400).send("Profile Deletion Failed : " + error.message);
  }
});


module.exports = profileRouter;
