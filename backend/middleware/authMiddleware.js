import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../models/userModel.js";

// PROTECTING MIDDLEWARES

// Protect routes
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check for token in cookies
  token = req.cookies.jwt;

  // Check if token exists
  if (token) {
    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } 
    // If token verification fails
    catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not authorized, invalid token");
    }
  } 
  // If no token is found
  else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

// Admin middleware
const admin = (req, res, next) => {
  // Check if user is admin
  if (req.user && req.user.isAdmin) {
    next();
  } 
  // If user is not admin
  else {
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
};

export { protect, admin };
