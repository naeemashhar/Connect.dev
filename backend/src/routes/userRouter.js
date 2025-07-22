const express = require("express");
const userRouter = express.Router();

const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");


const User_Safe_Data =
  "firstName lastName photoURL age gender about skills title city country";

//get all the pending-connection request for loggedInUser
userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequests = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", User_Safe_Data); //REF AND POPULATE =>referring to user(fromUserId)

    //}).populate("fromUserId", ["firstName", "lastName"]) first-way

    res.json({
      message: "Data fetched successfully",
      data: connectionRequests,
    });
  } catch (error) {
    res.status(400).send("ERROR : " + error.message);
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequests = await ConnectionRequest.find({
      $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        { fromUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", User_Safe_Data)
      .populate("toUserId", User_Safe_Data);

    // Filter out requests where either user was deleted
    const validConnections = connectionRequests
      .filter((row) => row.fromUserId && row.toUserId)
      .map((row) => {
        // Safely compare _id strings
        const fromId = row.fromUserId._id.toString();
        const toId = row.toUserId._id.toString();
        const loggedInId = loggedInUser._id.toString();

        return fromId === loggedInId ? row.toUserId : row.fromUserId;
      });

    res.json({
      data: validConnections,
    });
  } catch (error) {
    console.error("Connection fetch error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    //for pagination
    const page = parseInt( req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    //validate limit
    limit = limit > 50 ? 50 : limit ;
    const skip = (page-1) * limit ;

    // find all connections req (sent(fromUserId) + received(toUserId))
    const connectionRequests = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    }).select("fromUserId toUserId");

    //set is data-structure
    const hideUserFromFeed = new Set();
    connectionRequests.forEach((req) => {
      hideUserFromFeed.add(req.fromUserId.toString());
      hideUserFromFeed.add(req.toUserId.toString());
    });

    //doing all that 
    // user should not see his own card
    // user should not see whom already connected to him
    // user should not see the ignored card
    // user should not see whom he already send interested/connection req to him
    const users = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUserFromFeed) } },
        { _id: { $ne: loggedInUser._id } },
      ],
    }).select(User_Safe_Data).skip(skip).limit(limit);

    res.json({users});

  } catch (error) {
    res.json({ message: "ERROR" + error.message });
  }
});

module.exports = userRouter;
