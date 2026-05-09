import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

//----------------------------

// @des  Auth user and Get Token
// @route  POST/api/users/auth
// @access Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // Check for user email
  const user = await User.findOne({ email });
  // Check if user exists and password matches
  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id); // Generate JWT token and set cookie
    // Send user data as response
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  }
  // If user not found or password doesn't match, send error response
  else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @des  Register user
// @route  POST/api/users/register
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Check if user already exists
  const userExists = await User.findOne({ email });
  // If user exists, send error response
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Create new user
  const user = await User.create({
    name,
    email,
    password,
  });
  // If user created successfully, send user data as response
  if (user) {
    generateToken(res, user._id); // Generate JWT token and set cookie
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  }
  // If user creation failed, send error response
  else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @des  Logout user / clear cookie
// @route  POST/api/users/logout
// @access Private
const logoutUser = asyncHandler(async (req, res) => {
  // Clear the JWT cookie by setting it to an empty value and expiring it immediately
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0), // Set the cookie to expire immediately
  });
  res.status(200).json({
    message: "User Logged Out Successfully",
  });
});

// @des  Get User Profile
// @route  GET/api/users/login/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
  // Since this route is protected by authMiddleware, we can access the authenticated user's ID from req.user._id
  const user = await User.findById(req.user._id);
  // If user found, send user data as response
  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  }
  // If user not found, send error response
  else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @des  Update User Profile
// @route  POST/api/users/login/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  // Since this route is protected by authMiddleware, we can access the authenticated user's ID from req.user._id
  const user = await User.findById(req.user._id);

  // If user found, update user data with values from request body (if provided) and save the updated user
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    // Save the updated user to the database and get the updated user data
    const updatedUser = await user.save();

    // Send the updated user data as response
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  }
  // If user not found, send error response
  else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @des  Get Users
// @route  GET/api/users
// @access Private/admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
});

// @des  Get User By Id
// @route  GET/api/users/:id
// @access Private/admin
const getUserById = asyncHandler(async (req, res) => {
  // Find the user by ID
  const user = await User.findById(req.params.id).select("-password");

  // If user found, send user data as response
  if (user) {
    res.status(200).json(user);
  }
  // If user not found, send error response
  else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @des  Update User
// @route  PUT/api/users/:id
// @access Private/admin
const updateUser = asyncHandler(async (req, res) => {
  // Find the user by ID
  const user = await User.findById(req.params.id);

  // If user found, update user data with values from request body (if provided) and save the updated user
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = Boolean(req.body.isAdmin);

    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  }
  // If user not found, send error response
  else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @des  Delete User
// @route  DELETE/api/users/:id
// @access Private/admin
const deleteUser = asyncHandler(async (req, res) => {
  // Find the user by ID
  const user = await User.findById(req.params.id);

  // If user found, delete the user
  if (user) {
    // Check if user is admin
    if (user.isAdmin) {
      res.status(400);
      throw new Error("Can't delete admin user");
    }
    // If user is not admin
    else {
      await User.deleteOne({ _id: user._id });
      res.status(200).json({
        message: "User Deleted Successfully",
      });
    }
  }
  // If user not found, send error response
  else {
    res.status(404);
    throw new Error("User not found");
  }
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
