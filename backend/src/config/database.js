//mongoose => is a library that provides a schema-based solution to model your application data.
// Schema => is a blueprint for the structure of a document in MongoDB.

const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    process.env.DB_CONNECTION_STRING
  );
};

module.exports = connectDB;


