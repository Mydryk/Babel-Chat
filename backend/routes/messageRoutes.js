const express = require("express");
const {
  allMessages,
  sendMessage,
  allMessagesNotSender,
  updateReadBy,
} = require("../controllers/messageControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/:chatId").get(protect, allMessages);
router.route("/").post(protect, sendMessage);
router.route("/").get(protect, allMessagesNotSender);
router.route("/readBy/:chatId").put(protect, updateReadBy);

module.exports = router;
