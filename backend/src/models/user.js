const mongoose = require("mongoose");
const validator = require("validator"); // This is a library used to validate email addresses and other data types.
const jwt = require("jsonwebtoken"); // This is a library used to create and verify JSON Web Tokens (JWT).
const bcrypt = require("bcrypt"); // This is a library used to hash passwords securely.

//create a schema for the user model
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      maxlength: 20,
      minlength: 3,
    },
    lastName: {
      type: String,
      maxlength: 20,
      minlength: 3,
    },
    title: {
      type: String,
      enum: ["Student", "Fresher", "Professional"], // Validates that the title is one of the specified values
      default: "Fresher",
      maxlength: 15,
    },
    emailId: {
      type: String,
      unique: true, //automatically creates a unique index on this field
      lowercase: true,
      trim: true,
      maxlength: 50,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid: " + value);
        }
      },
      //match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"], //This is the RegEx used to validate a basic email pattern.
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Password is not strong enough");
        }
      },
    },
    age: {
      type: Number,
      min: 14,
      required: true,
      max: 100
    },
    gender: {
      type: String,
      required: true,
      enum: {
        values : ["Male", "Female", "Other"],
        message: `{VALUE} is not a valid gender`
      }
      /* validate(value) {
        //this function will only run when new data is added/inserted.
        if (!["Male", "Female"].includes(value)) {
          throw new Error("Gender data is invalid");
        }
      }, */

    },
    photoURL: {
      type: String,
      default:
        "https://media.istockphoto.com/id/2151669184/vector/vector-flat-illustration-in-grayscale-avatar-user-profile-person-icon-gender-neutral.jpg?s=612x612&w=0&k=20&c=UEa7oHoOL30ynvmJzSCIPrwwopJdfqzBs0q69ezQoM8=",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Photo URL is invalid: " + value);
        }
      },
    },
    about: {
      type: String,
      default: "Hey there! I am using this app.",
      maxlength: [150, "About section cannot exceed 150 characters."],
    },
    skills: {
      type: [String],
      validate: {
        validator: function (arr) {
          //it's an array of non-empty strings, no duplicates.
          const uniqueSkills = new Set(arr.map((s) => s.trim().toLowerCase()));
          return (
            Array.isArray(arr) &&
            arr.every(
              (skill) => typeof skill === "string" && skill.trim() !== "" &&
              skill.length <= 10
            ) &&
            uniqueSkills.size === arr.length // no duplicates
          );
        },
        message: "Skills must be unique, non-empty strings.",
      },
      default: [],
    },
    city: {
      type: String,
      required: true,
      maxlength: 15,
    },
    country: {
      type: String,
      required: true,
      maxlength: 15,
    },
    isPremium:{
      type:Boolean,
      default:false
    },
    membershipType:{
      type:String,
    },
    
  },
  {
    timestamps: true,
  }
);

userSchema.index({ //compound-indexing
  firstName: 1,
  lastName: 1,
});

// This method will be used to generate a JWT token for the user
//IMPORTANTTTT => the function always be a normal one DON'T USE (arrow function), because 'this' keyword will only work with normal/older functions.
userSchema.methods.getJWT = async function () {
  const user = this; // 'this' refers to the current instance of the user model

  //CREATING a JWT token (json web token) for the user.
  const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this; // 'this' refers to the current instance of the user model
  const passwordHash = user.password; // Get the password from the user instance

  const isPasswordValid = bcrypt.compare(passwordInputByUser, passwordHash);

  return isPasswordValid;
};

//create & exporting a model for the user schema
module.exports = mongoose.model("User", userSchema);
