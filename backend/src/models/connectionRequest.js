const mongoose = require("mongoose");



const connectionSchema = new mongoose.Schema(
  {
    fromUserId: {
      //sender of the connection request
      type: mongoose.Schema.Types.ObjectId, //user-id
      ref : "User", //referring to that perticular user-collection (linking)
      required: true,
    },
    toUserId: {
      //receiver of the connection request
      type: mongoose.Schema.Types.ObjectId, //user-id
      ref : "User",
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["ignored", "interested", "accepted", "rejected"],
        message: `{VALUE} is not a valid status`,
      },
    },
  },
  {
    timestamps: true,
  }
);

//1 => ascending order, -1 => descending order
connectionSchema.index({ //compound-indexing
    fromUserId : 1,
    toUserId : 1,
});

// Middleware to handle when a connection request is saved
 connectionSchema.pre("save", async function(next) { //always normal function
    const connectionRequest = this;

    //check if fromUserId and toUserId are the same
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
        throw new Error("You cannot send a connection request to yourself.");
    }
    next(); //call next middleware
 });



module.exports = mongoose.model("ConnectionRequest", connectionSchema);
