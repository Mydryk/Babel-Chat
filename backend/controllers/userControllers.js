const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");
const Chat = require("../models/chatModel");
const Message = require("../models/messageModel");

//@description     Get or Search all users
//@route           GET /api/user?search=
//@access          Public
const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find({ ...keyword, _id: { $ne: req.user._id } });
  res.send(users);
});

//@description     Register new user
//@route           POST /api/user/
//@access          Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic, language } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please Enter all the Fields");
  }

  const invalidEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
    email
  );
  if (!invalidEmail) {
    res.status(400);
    throw new Error("Please enter a valid email address");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    language,
    pic,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

//@description     Auth the user
//@route           POST /api/users/login
//@access          Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      language: user.language,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

//@description     Update user profile
//@route           PUT /api/user/:id
//@access          Private
//@TODO            Add validation from for the fields
const updateUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  if (user.email !== email) {
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    { name, email, password, pic },
    { new: true }
  );

  res.json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    isAdmin: updatedUser.isAdmin,
    pic: updatedUser.pic,
    token: generateToken(updatedUser._id),
  });
});

//@description     Delete user
//@route           DELETE /api/user/:id
//@access          Private
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  await User.findByIdAndDelete(req.params.id);

  res.json({ message: "User deleted successfully" });
});

//@description     Get user notifications and populate with chat and message
//@route           GET /api/user/:id/notifications
//@access          Private
//TODO            Populate full sender details (name, pic, email)
//TODO            Populate chat and message details
const getUserNotifications = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate({
    path: "notifications",
    populate: [
      {
        path: "chat",
      },
      {
        path: "sender",
        select: "pic _id name",
      },
    ],
  });

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  res.json(user.notifications);
});

//@description     Update user notification to delete all notifications that has a chat id equal to the chat id passed
//@route           PUT /api/user/notifications
//@access          Private
const updateUserNotifications = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const notificationsToRemove = await Message.find({ chat: req.body.chatId });

  await User.findByIdAndUpdate(
    req.user._id,
    {
      $pull: {
        notifications: {
          $in: notificationsToRemove.map((notification) => notification._id),
        },
      },
    },
    { new: true }
  );

  res.json({ message: "Notifications updated successfully" });
});

module.exports = {
  allUsers,
  registerUser,
  authUser,
  updateUser,
  deleteUser,
  getUserNotifications,
  updateUserNotifications,
};
