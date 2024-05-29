const asyncHandler = require("express-async-handler");
const Message = require("../models/messageModel");
const User = require("../models/userModel");
const Chat = require("../models/chatModel");
const { translateMessage } = require("../utils/translator"); // Імпортуємо функцію перекладу

//@description     Get all Messages
//@route           GET /api/Message/:chatId
//@access          Protected
const allMessages = asyncHandler(async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name pic email language") // Додаємо мову відправника
      .populate("chat", "chatName isGroupChat groupAdmin users")
      .populate("chat.groupAdmin", "name pic email");

    // Фільтруємо повідомлення відповідно до мови поточного користувача
    const userLanguage = req.user.language;
    const translatedMessages = messages.map((message) => {
      if (message.sender.language === userLanguage) {
        return { ...message._doc, translatedContent: message.content };
      } else {
        return message;
      }
    });

    res.json(translatedMessages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

//@description     Create New Message
//@route           POST /api/Message/
//@access          Protected
const sendMessage = asyncHandler(async (req, res) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }

  const sender = req.user;
  const chat = await Chat.findById(chatId).populate("users");
  const receiver = chat.users.find(
    (user) => user._id.toString() !== sender._id.toString()
  );

  // Перекласти повідомлення на мову отримувача
  const receiverLanguage = receiver.language;
  const translatedContent = await translateMessage(
    content,
    receiverLanguage, // Цільова мова для перекладу
    sender.language
  );

  var newMessage = {
    sender: req.user._id,
    content: content,
    translatedContent: translatedContent, // Додаємо перекладений вміст
    chat: chatId,
  };

  try {
    var message = await Message.create(newMessage);

    message = await message.populate("sender", "name pic").execPopulate();
    message = await message
      .populate("chat", "chatName groupAdmin isGroupChat users")
      .execPopulate();
    message = await User.populate(message, {
      path: "chat.users",
      select: "name pic email",
    });
    message = await User.populate(message, {
      path: "chat.groupAdmin",
      select: "name pic email",
    });

    await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message })
      .populate("users", "-password")
      .populate("latestMessage")
      .populate("groupAdmin", "name pic email");

    res.json(message);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

//@description     Get all messages of every chat where the user is not the sender AND is not in the readBy array of the message AND is in the users array of the chat
//@route           GET /api/Message/
//@access          Protected
const allMessagesNotSender = asyncHandler(async (req, res) => {
  userChats = await Chat.find({
    users: { $elemMatch: { $in: [req.user._id] } },

  }).populate("groupAdmin", "name pic email");

  try {
    const messages = await Message.find({
      $and: [
        {sender: { $ne: req.user._id }},
        {readBy: { $nin: [req.user._id] }},
        {chat: { $in: userChats.map((chat) => chat._id) }},
      ],
    })
      .populate("sender", "name pic email")
      .populate("chat", "chatName isGroupChat groupAdmin users")
      .populate("groupAdmin", "name pic email");
    //sort by latest to oldest
    messages.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
}
);

const updateReadBy = asyncHandler(async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId });
    //loop through messages
    for (let i = 0; i < messages.length; i++) {
      //if user is not in the readBy array of the message
      if (!messages[i].readBy.includes(req.user._id) && messages[i].sender != req.user._id) {
        //add user to the readBy array of the message
        messages[i].readBy.push(req.user._id);
        //save message
        await Message.findByIdAndUpdate(messages[i]._id, {
          readBy: messages[i].readBy,
        });
      }
    }
    res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
}
);

module.exports = { allMessages, sendMessage, allMessagesNotSender, updateReadBy };
