const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const User = require("../models/user");
const userAuth = async (req, res, next) => {
  try {
    //read the token from cookies
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).send("Please login!")
    }

    //validate the token
    const decodedMsg = await jwt.verify(token, process.env.JWT_SECRET);

    const { _id } = decodedMsg;

    //find the user
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found");
    }
    req.user = user; //attach user to the request object for further use

    next(); //if user found, then continue to the next middleware or route handler
 
} catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
};

module.exports = {
  userAuth,
};
