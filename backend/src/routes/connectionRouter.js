const express = require("express");
const connectionRouter = express.Router();

const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

//to send connection
connectionRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id; //receiver id
      const toUserId = req.params.toUserId; //sender id
      const status = req.params.status; //status of the connection request

      // Validation
      const allowedStatus = ["interested", "ignored"];
      if (!allowedStatus.includes(status)) {
        return res.status(400).json({
          message: `Invalid status. Allowed values are: ${allowedStatus.join(
            ", "
          )}`,
        });
      }

      //check if the user exists
      const toUser = await User.findById(toUserId);
      if (!toUser) {
        return res.status(404).json({
          message: "User not found.",
        });
      }

      //validation connection request (user should not send connection request to himself)
      const existingRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId }, //(if there is existing request from the sender to the receiver)
          { fromUserId: toUserId, toUserId: fromUserId }, //(receiver has sent the request to sender tooo)
        ],
      });
      if (existingRequest) {
        return res.status(400).json({
          message: "Connection request already exists.",
        });
      }

      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      const data = await connectionRequest.save(); //this is where pre-save middleware is called

      res.json({
        message:
          req.user.firstName +
          " has " +
          (status === "interested" ? "expressed interest in " : status + " ") +
          toUser.firstName,

        data,
      });
    } catch (error) {
      res.status(400).send("ERROR : " + error.message);
    }
  }
);

//to accept/reject connection
connectionRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const loggedInUser = req.user;
      const { status, requestId } = req.params;

      // Validate status
      const allowedStatus = ["accepted", "rejected"];
      if (!allowedStatus.includes(status)) {
        return res.status(400).json({
          message: `Invalid status. Allowed values are: ${allowedStatus.join(
            ", "
          )}`,
        });
      }

      // Find the connection request where the logged-in user is the receiver
      const connectionRequest = await ConnectionRequest.findOne({
        _id: requestId,
        toUserId: loggedInUser._id,
        status: "interested",
      });

      if (!connectionRequest) {
        return res
          .status(400)
          .json({ message: "Connection Request Not Found" });
      }

      let responseMessage = "";

      if (status === "accepted") {
        connectionRequest.status = "accepted";
        connectionRequest.updatedAt = new Date();
        const data = await connectionRequest.save();
        responseMessage = "User accepted the request";
        return res.json({ message: responseMessage, data });
      }

      // If rejected → delete the request
      await ConnectionRequest.deleteOne({ _id: requestId });
      responseMessage = "User rejected the request";

      return res.json({ message: responseMessage });

    } catch (error) {
      res.status(400).send("ERROR: " + error.message);
    }
  }
);



module.exports = connectionRouter;
