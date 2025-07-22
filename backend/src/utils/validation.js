const validator = require("validator");
const bcrypt = require("bcrypt");

const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password, age, gender, city, country } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Name is not valid");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email is not valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter a strong password");
  }
  if (!age || typeof age !== "number" || age < 14 || age > 99) {
    throw new Error("Age must be a number between 14 and 99");
  } else if (!gender || !["Male", "Female"].includes(gender)) {
    throw new Error("Gender must be 'Male' or 'Female'");
  } else if (!city || city.trim().length === 0 || city.length > 15) {
    throw new Error("City is required and must be under 15 characters");
  } else if (!country || country.trim().length === 0 || country.length > 15) {
    throw new Error("Country is required and must be under 15 characters");
  }
};

const validateProfileData = (req) => {
  const allowedFields = [
    "firstName",
    "lastName",
    "title",
    "age",
    "gender",
    "photoURL",
    "about",
    "skills",
    "city",
    "country",
  ];

  const {
    firstName,
    lastName,
    title,
    age,
    gender,
    photoURL,
    about,
    skills,
    city,
    country,
  } = req.body;

  if (firstName && lastName.length > 10) {
    throw new Error(
      "First Name and Last Name should not be more than 10 characters"
    );
  } else if (city && country.length > 10) {
    throw new Error("City and Country should not be more than 10 characters");
  } else if (
    title &&
    !["Student", "Fresher", "Professional", "Other"].includes(title)
  ) {
    throw new Error("Title is not valid");
  } else if (age && age < 14) {
    throw new Error("Minimum Age should be 14");
  } else if (about.length > 100) {
    throw new Error("About section should not be more than 100 characters");
   
  } else if (!validator.isURL(photoURL)) {
    throw new Error("Photo URL is not valid");
  } else if (skills) {
    if (!Array.isArray(skills)) {
      throw new Error("Skills must be an array of strings");
    }
    if (skills.length > 10) {
      throw new Error("Skills should not be more than 10");
    }
    const hasInvalidSkill = skills.some(
      (skill) =>
        typeof skill !== "string" || skill.trim() === "" || skill.length > 30
    );
    if (hasInvalidSkill) {
      throw new Error(
        "Each skill must be a non-empty string with max 30 characters"
      );
    }
    const skillSet = new Set(skills.map((skill) => skill.trim().toLowerCase()));
    if (skillSet.size !== skills.length) {
      throw new Error("Duplicate skills are not allowed");
    }
  }

  const isEditAllowed = Object.keys(req.body).every((fields) =>
    allowedFields.includes(fields)
  );

  return isEditAllowed;
};

const validateForgotPassword = async (req, user) => {
  const { password } = req.body;

  if (!password) {
    throw new Error("Password is required");
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter a stronger password");
  }

  const isSamePassword = await bcrypt.compare(password, user.password);
  if (isSamePassword) {
    throw new Error("New password must be different from the previous one");
  }
};

const validateDeleteProfile = (req) => {
  if (!req.user || !req.user._id) {
    throw new Error("Unauthorized: Please log in to delete your profile.");
  }
};

module.exports = {
  validateSignUpData,
  validateProfileData,
  validateForgotPassword,
  validateDeleteProfile,
};
