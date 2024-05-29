import LogoImage from "../../assets/image-3.png";
import "antd/dist/antd.css";
import { Badge } from "antd";
import { Button } from "@chakra-ui/button";
import { useColorMode, useColorModeValue } from "@chakra-ui/react";
import { Box } from "@chakra-ui/layout";
import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/menu";
import { Tooltip } from "@chakra-ui/tooltip";
import { BellIcon, ChevronDownIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Avatar } from "@chakra-ui/avatar";
import { useHistory } from "react-router-dom";
import ProfileModal from "./ProfileModal";
import { ChatState } from "../../Context/ChatProvider";

function SideDrawer() {
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue("white", "black");

  const { setSelectedChat, user, notification } = ChatState();

  const history = useHistory();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    history.push("/");
    document.location.reload(true);
  };

  return (
    <>
      <Box
        d="flex"
        justifyContent="space-between"
        alignItems="center"
        bg={bgColor}
        w="100%"
        h="80px"
        p="5px 10px 5px 10px"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Box w={{ base: "8em", md: "10em" }} onClick={() => history.push("/")}>
          <img
            src={LogoImage}
            alt="Logo"
            style={{ width: "100%", height: "20%" }}
          />
        </Box>

        <div>
          <Button variant="ghost" onClick={toggleColorMode}>
            {colorMode === "light" ? (
              <Tooltip label="Dark Mode" hasArrow placement="bottom-end">
                <MoonIcon />
              </Tooltip>
            ) : (
              <Tooltip label="Light Mode" hasArrow placement="bottom-end">
                <SunIcon />
              </Tooltip>
            )}
          </Button>
          <Menu>
            <MenuButton p={1} mr={4}>
              <Badge
                count={notification.length}
                overflowCount={10}
                offset={[-3, 7]}
                size="small"
                title={`${notification.length} new notifications`}
              >
                <BellIcon
                  fontSize="2xl"
                  m={1}
                  color={colorMode === "light" ? "black" : "white"}
                />
              </Badge>
            </MenuButton>
            <MenuList p={2} m={3} maxHeight={290} overflowY="auto">
              {!notification.length && "No New Messages"}
              {notification.map((notif) => (
                <MenuItem
                  key={notif._id}
                  onClick={() => {
                    setSelectedChat(notif.chat);
                  }}
                >
                  {notif.chat.isGroupChat
                    ? `New Message in ${notif.chat.chatName}`
                    : `New Message from ${notif.sender.name}`}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton
              h="60px"
              as={Button}
              bg={bgColor}
              rightIcon={<ChevronDownIcon />}
            >
              <Avatar
                w="50px"
                h="50px"
                cursor="pointer"
                name={user.name}
                src={user.pic}
              />
            </MenuButton>
            <MenuList>
              <ProfileModal user={user}>
                <MenuItem>My Profile</MenuItem>{" "}
              </ProfileModal>
              <MenuDivider />
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>
    </>
  );
}

export default SideDrawer;
