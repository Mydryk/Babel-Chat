
# Gap De

Gap De is a Full Stack Chatting App.
Uses Socket.io for real time communication and stores user details in encrypted format in Mongo DB Database.
## Tech Stack

**Client:** React JS

**Server:** Node JS, Express JS

**Database:** Mongo DB
  
## Demo

https://gap-de.herokuapp.com/

![](https://github.com/nmansoorn/gap-de-chat-app/blob/master/screenshots/group%20%2B%20notif.PNG)
## Run Locally

Clone the project

```bash
  git clone https://github.com/nmansoorn/gap-de-chat-app
```

Go to the project directory

```bash
  cd gap-de-chat-app
```

Install dependencies

```bash
  npm install
```

```bash
  cd client
  npm install
```

Start the server

```bash
  cd ..
  npm start
```
Start the Client

```bash
  //open now terminal
  cd client
  npm start
```

  
# Features

### Modern Landing Page
![](https://github.com/nmansoorn/gap-de-chat-app/blob/main/screenshots/1_LandingPage.png)
### Authenticaton
![](https://github.com/nmansoorn/gap-de-chat-app/blob/main/screenshots/2_LoginPage.png)
![](https://github.com/nmansoorn/gap-de-chat-app/blob/main/screenshots/3_SignUpPage.png)
### Responsive Minimalistic Design
![](https://github.com/nmansoorn/gap-de-chat-app/blob/main/screenshots/4_ChatPage.png)
### Dark/Light Mode
![](https://github.com/nmansoorn/gap-de-chat-app/blob/main/screenshots/5_SingleChatResponsive.png)
![](https://github.com/nmansoorn/gap-de-chat-app/blob/main/screenshots/6_SingleChatLightMode.png)
### Real Time Chatting with Typing indicators
![](https://github.com/nmansoorn/gap-de-chat-app/blob/main/screenshots/7_TypingIndicator.png)
### One to One and Group chats
![](https://github.com/nmansoorn/gap-de-chat-app/blob/main/screenshots/8_OneToOneandGroup.png)
### Avatars, Last Message Received Timestamp, Unread Message Indicator, and Delete Chat Button (Admin)
![](https://github.com/nmansoorn/gap-de-chat-app/blob/main/screenshots/9_BellsAndWestles.png)
### Search Users
![](https://github.com/nmansoorn/gap-de-chat-app/blob/main/screenshots/10_SearchUsersDrawer.png)
### Create Group Chats and Dynamic Search
![](https://github.com/nmansoorn/gap-de-chat-app/blob/main/screenshots/11_DynamicSearchGroupChat.png)
### Persistent Notifications
![](https://github.com/nmansoorn/gap-de-chat-app/blob/main/screenshots/12_Notifications.png)
### Add or Remove users from group (Admin vs Non-admin)
![](https://github.com/nmansoorn/gap-de-chat-app/blob/main/screenshots/13_ViewDetailsAdmin.png)
![](https://github.com/nmansoorn/gap-de-chat-app/blob/main/screenshots/14_ViewDetailsNonAdmin2.png)
### View User Profile
![](https://github.com/nmansoorn/gap-de-chat-app/blob/main/screenshots/15_UserProfile.png)

### Upcomming Features
- Enable user to update/delete account
- Emergency Delete All button
- View Online/Offline Status
- View all users
- Global chat rooms (viewable by all users)
- Add mini-avatars of users (max 5) infront of Group Chat name
- Timestamps for last message within the open chat page
- Add username on top of the message bubble for group chats (currenly shown on hover)
- Convert Single Chat search to dynamic (like the group chat)


### Challenge
- Without compromising reliability and keeping storage in mind, implement a delete chat feature that enables any user to delete a chat ONLY from their account keeping the history intact for other users. Upon receiving a new message, create a new message for the deleting user, and keep the trail for the rest of the users. In case of a group chat, the deleting user needs to be re-added.

## Made By
- [@nmansoorn](https://github.com/nmansoorn)

  
