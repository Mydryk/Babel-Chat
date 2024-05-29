const express = require("express");
const {
  registerUser,
  authUser,
  allUsers,
  updateUser,
  deleteUser,
  getUserNotifications,
  updateUserNotifications,
} = require("../controllers/userControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();


router.route("/").get(protect, allUsers);
router.route("/").post(registerUser);
router.post("/login", authUser);
// router.put("/:id", protect, updateUser);
// router.delete("/:id", protect, deleteUser);
router.get("/notifications", protect, getUserNotifications);
router.route("/notifications").put(protect, updateUserNotifications);

module.exports = router;
