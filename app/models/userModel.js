import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Enter a username"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Enter an email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Enter a password"],
  },

  isVerified: {
    type: Boolean,
    default: false,
  },

  isAdmin: {
    type: Boolean,
    default: false,
  },

  verifyToken: String,
  verifyTokenExpiry: Date,
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
});

const User = mongoose.models.User || mongoose.model("User", userSchema);


export default User;
