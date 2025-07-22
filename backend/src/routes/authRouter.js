const express = require("express");
const authRouter = express.Router();

const User = require("../models/user");
const { validateSignUpData } = require("../utils/validation");
const bcrypt = require("bcrypt"); // Import bcrypt for password hashing
const jwt = require("jsonwebtoken");

authRouter.post("/signup", async (req, res) => {
  try {
    //validation of data (Required Data)
    validateSignUpData(req);

    const {
      firstName,
      lastName,
      emailId,
      password,
      age,
      gender,
      city,
      country,
      photoURL,
      about,
      skills,
      title,
    } = req.body;

    //Encrypt the password(using bcryptjs or bcrypt)
    //salt rounds are the number of times the password is hashed (asdasdasd245$#^$#)salt is a random string
    const passwordHash = await bcrypt.hash(password, 10);

    //create a new instance of the User model (dynamically)
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
      age,
      gender,
      city,
      country,
      photoURL,
      about: about?.trim() ? about : undefined,
      skills,
      title,
    });

    await user.save();
    res.send("User created successfully");
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(400).send({ message: error.message });
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    //to check if email exists in the database
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid credentials");
    }

    // if email present then below
    // we will validate the password using the validatePassword method from the user model instance
    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      //just calling the getJWT method from the user model instance
      const token = await user.getJWT();

      //ADDING token to the cookie and send response back to the user.
      res.cookie("token", token, {
        httpOnly: true, // ✅ Prevents access from JavaScript (security)
        secure: true, // ✅ Required for HTTPS (Render uses HTTPS)
        sameSite: "None", // ✅ Required for cross-site cookies
        expires: new Date(Date.now() + 8 * 3600000), // 8 hours
      });

      res.send(user);
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (error) {
    res.status(400).send("Login Failed : " + error.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    expires: new Date(0),
  });
  res.send("Logout Successful !!!");
});


module.exports = authRouter;
