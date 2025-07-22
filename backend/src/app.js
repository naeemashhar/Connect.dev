const express = require("express");
const connectDB = require("./config/database");

const app = express();
const cookieParser = require("cookie-parser");
const cors = require ("cors");

require("dotenv").config(); // Load environment variables from .env file


const authRouter = require("./routes/authRouter");
const profileRouter = require("./routes/profileRouter");
const connectionRouter = require("./routes/connectionRouter"); 
const userRouter = require("./routes/userRouter");

const allowedOrigin = process.env.FRONTEND_URL;
app.use(cors({
  origin :allowedOrigin,
  credentials: true,
}));
app.use(cookieParser()); // Middleware to parse cookies from the request
app.use(express.json()); // Middleware to parse JSON request bodies


app.use('/', authRouter); 
app.use('/', profileRouter);
app.use('/', connectionRouter); 
app.use('/', userRouter); 



connectDB()
  .then(() => {
    console.log("Database connected successfully...");

    app.listen(process.env.PORT, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });
