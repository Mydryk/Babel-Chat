import { AddIcon, DeleteIcon, InfoIcon } from "@chakra-ui/icons";
import { Box, Stack, Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  getSender,
  getSenderFull,
  getLatestMessageDate,
} from "../config/ChatLogics";
import ChatLoading from "./ChatLoading";
import GroupChatModal from "./miscellaneous/GroupChatModal";
import { Button, Avatar } from "@chakra-ui/react";
import { ChatState } from "../Context/ChatProvider";
import { useColorModeValue } from "@chakra-ui/react";
import { Tooltip } from "@chakra-ui/tooltip";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/modal";
import { useDisclosure } from "@chakra-ui/hooks";
import { Input } from "@chakra-ui/input";
import UserListItem from "./userAvatar/UserListItem";
import { Spinner } from "@chakra-ui/spinner";

const MyChats = ({ fetchAgain }) => {
  const bgColor = useColorModeValue("white", "black");
  const secondarybgColor = useColorModeValue("#F8F8F8", "#1D1D1D");
  const tertiarybgColor = useColorModeValue("#E8E8E8", "rgb(41,42,45)");
  const reverseTextColor = useColorModeValue("black", "white");
  const coloredBg = useColorModeValue(
    "rgb(133, 170, 223)",
    "rgb(71, 105, 178)"
  );

  const { selectedChat, setSelectedChat, user, chats, setChats, notification } =
    ChatState();
  const notificationIds = notification.map((notification) => notification._id);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  const toast = useToast();

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("/api/chat", config);
      setChats(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    fetchChats();
    // eslint-disable-next-line
  }, [fetchAgain]);

  const handleDeleteChat = async (chatId) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.put(`/api/chat/delete`, { chatId }, config);
      setChats(chats.filter((chat) => chat._id !== data._id));
      if (selectedChat._id === data._id) {
        setSelectedChat("");
      }
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to delete chat",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const handleSearch = async (event) => {
    if (
      event.type === "click" ||
      (event.type === "keydown" && event.key === "Enter")
    ) {
      if (!search) {
        toast({
          title: "Please Enter something in search",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "top-left",
        });
        return;
      }

      try {
        setLoading(true);

        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };

        const { data } = await axios.get(`/api/user?search=${search}`, config);

        setLoading(false);
        setSearchResult(data);
      } catch (error) {
        toast({
          title: "Error Occured!",
          description: "Failed to Load the Search Results",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom-left",
        });
      }
    }
  };

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(`/api/chat`, { userId }, config);

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  return (
    <Box
      d={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      bg={bgColor}
      w={{ base: "100%", md: "50%", lg: "31%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "1.4em", md: "1.3em", lg: "1.4em" }}
        fontFamily="Work sans"
        d="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        <Tooltip label="Search Users to chat" hasArrow placement="bottom-end">
          <Button
            variant="ghost"
            onClick={onOpen}
            border="2px"
            borderColor={secondarybgColor}
          >
            <i className="fas fa-search"></i>
            <Text d={{ base: "none", md: "none", lg: "flex" }} px={4}>
              Search User
            </Text>
          </Button>
        </Tooltip>
        <GroupChatModal>
          <Button
            d="flex"
            fontSize={{ base: "0.55em", md: "0.55em", lg: "0.6em" }}
            rightIcon={<AddIcon />}
          >
            New Group Chat
          </Button>
        </GroupChatModal>
      </Box>
      <Box
        d="flex"
        flexDir="column"
        p={3}
        bg={secondarybgColor}
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden"
      >
        {chats ? (
          chats.length > 0 ? (
            <Stack overflowY="auto" pr={2}>
              {chats.map((chat) => (
                <Box
                  key={chat._id}
                  d="flex"
                  flexDir="row"
                  justifyContent="space-between"
                  alignItems="center"
                  bg={selectedChat === chat ? coloredBg : tertiarybgColor}
                  color={selectedChat === chat ? "white" : reverseTextColor}
                  px={3}
                  py={2}
                  _hover={{
                    background: coloredBg,
                    color: "white",
                  }}
                  borderRadius="lg"
                  borderLeftWidth={
                    chat.latestMessage &&
                    notificationIds.includes(chat.latestMessage._id)
                      ? "8px"
                      : "0px"
                  }
                  borderLeftColor={
                    chat.latestMessage &&
                    notificationIds.includes(chat.latestMessage._id)
                      ? coloredBg
                      : "transparent"
                  }
                  borderLeftStyle="solid"
                >
                  <Box
                    d="flex"
                    flexDir="row"
                    alignItems="center"
                    w="80%"
                    onClick={() => setSelectedChat(chat)}
                  >
                    {!chat.isGroupChat ? (
                      <Avatar
                        src={getSenderFull(user, chat.users).pic}
                        size="sm"
                        mr={2}
                      />
                    ) : (
                      <Avatar name={chat.chatName} size="sm" mr={2} />
                    )}
                    <Box>
                      <Text>
                        {!chat.isGroupChat
                          ? getSender(user, chat.users)
                          : chat.chatName}
                      </Text>
                      {chat.latestMessage && (
                        <Text fontSize="xs">
                          <b>{chat.latestMessage.sender.name} : </b>
                          {chat.latestMessage.sender._id === user._id
                            ? chat.latestMessage.content
                            : chat.latestMessage.translatedContent}
                          {(chat.latestMessage.content.length > 50 ||
                            chat.latestMessage.translatedContent.length > 50) &&
                            "..."}
                        </Text>
                      )}
                    </Box>
                  </Box>
                  {chat.users.length >= 1 && (
                    <Box
                      d="flex"
                      alignItems="flex-end"
                      flexDir="column"
                      h="100%"
                      justifyContent="space-between"
                      w="30%"
                    >
                      <Box
                        w="100%"
                        h="60%"
                        d="flex"
                        justifyContent="flex-end"
                        onClick={() => setSelectedChat(chat)}
                      >
                        <Text fontSize="0.6rem" opacity="50%" cursor="default">
                          {chat.latestMessage
                            ? getLatestMessageDate(chat.latestMessage.createdAt)
                            : getLatestMessageDate(chat.createdAt)}
                        </Text>
                      </Box>
                      <Box
                        w="100%"
                        h="40%"
                        d="flex"
                        justifyContent="flex-end"
                        flexDir="row"
                      >
                        <Box
                          w="80%"
                          onClick={() => setSelectedChat(chat)}
                        ></Box>
                        <Box
                          w="20%"
                          d="flex"
                          justifyContent="center"
                          alignItems="center"
                        >
                          {!chat.isGroupChat ||
                          chat.groupAdmin._id === user._id ? (
                            <DeleteIcon
                              className="deleteIcon"
                              onClick={() => handleDeleteChat(chat._id)}
                              color="red.400"
                              w={3}
                              cursor="pointer"
                              filter="grayscale(100%)"
                            />
                          ) : (
                            <InfoIcon
                              className="infoIcon"
                              color="blue.400"
                              w={3}
                              cursor="pointer"
                              filter="grayscale(100%)"
                              onClick={() =>
                                toast({
                                  title: "Info",
                                  description:
                                    "Only admins can delete group chats. To leave the group open the chat and click on the view button.",
                                  status: "info",
                                  duration: 5000,
                                  isClosable: true,
                                  position: "bottom-left",
                                })
                              }
                            />
                          )}
                        </Box>
                      </Box>
                    </Box>
                  )}
                </Box>
              ))}
            </Stack>
          ) : (
            <Box
              d="flex"
              flexDir="column"
              alignItems="center"
              justifyContent="center"
              p={3}
              bg={secondarybgColor}
              w="100%"
              h="100%"
              borderRadius="lg"
            >
              <Box
                d="flex"
                flexDir="column"
                alignItems="center"
                justifyContent="center"
                mb="10px"
              >
                <Text fontSize="lg" fontFamily="Work sans">
                  <b>No existing chats</b>
                </Text>
              </Box>
              <Text fontSize="lg" fontFamily="Work sans" align="center">
                Click on <i className="fas fa-search"></i> icon to create a new
                chat, <br /> or click on{" "}
                <b>
                  New Group Chat <AddIcon w={3} />
                </b>{" "}
                to start a new group chat.
              </Text>
            </Box>
          )
        ) : (
          <ChatLoading />
        )}
      </Box>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
          <DrawerBody>
            <Box d="flex" pb={2}>
              <Input
                placeholder="Search by name or email"
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleSearch}
              />
              <Button onClick={handleSearch}>Go</Button>
            </Box>
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )}
            {loadingChat && <Spinner ml="auto" d="flex" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default MyChats;
