import { Avatar } from "@chakra-ui/avatar";
import { Tooltip } from "@chakra-ui/tooltip";
import ScrollableFeed from "react-scrollable-feed";
import { useColorModeValue } from "@chakra-ui/react";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../config/ChatLogics";
import { ChatState } from "../Context/ChatProvider";

const ScrollableChat = ({ messages }) => {
  const { user } = ChatState();
  const bubbleLeft = useColorModeValue("rgb(224,224,224)", "rgb(59,59,61)");
  const bubbleRight = useColorModeValue("rgb(12,133,255)", "rgb(12,133,255)");
  const chatTextLeft = useColorModeValue("black", "white");

  return (
    <ScrollableFeed>
      {messages &&
        messages.map((m, i) => (
          <div style={{ display: "flex", paddingRight: "10px" }} key={m._id}>
            {(isSameSender(messages, m, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
              <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
                <Avatar
                  mt="7px"
                  mr={1}
                  size="sm"
                  cursor="pointer"
                  name={m.sender.name}
                  src={m.sender.pic}
                />
              </Tooltip>
            )}
            <span
              style={{
                backgroundColor: `${
                  m.sender._id === user._id ? bubbleRight : bubbleLeft
                }`,
                marginLeft: isSameSenderMargin(messages, m, i, user._id),
                marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "75%",
                color: `${
                  m.sender._id === user._id ? "white" : chatTextLeft
                }`,
              }}
            >
              {m.sender._id === user._id
                ? m.content // Відображати оригінальний вміст для відправника
                : m.translatedContent // Відображати перекладений вміст для інших користувачів
              }
            </span>
          </div>
        ))}
    </ScrollableFeed>
  );
};

export default ScrollableChat;