import { Avatar } from "@chakra-ui/avatar";
import { Box, Text } from "@chakra-ui/layout";
// import { ChatState } from "../../Context/ChatProvider";
import { useColorModeValue } from "@chakra-ui/react";


const UserListItem = ({user, handleFunction }) => {
  const tertiarybgColor = useColorModeValue("#E8E8E8", "rgb(41,42,45)");
  const reverseTextColor = useColorModeValue("black", "white");
  const coloredBg = useColorModeValue("rgb(46,79,142)", "rgb(71, 105, 178)");

  return (
    <Box
      onClick={handleFunction}
      cursor="pointer"
      bg={tertiarybgColor}
      _hover={{
        background: coloredBg,
        color: "white",
      }}
      w="100%"
      d="flex"
      alignItems="center"
      color={reverseTextColor}
      px={3}
      py={2}
      mb={2}
      borderRadius="lg"
    >
      <Avatar
        mr={2}
        size="sm"
        cursor="pointer"
        name={user.name}
        src={user.pic}
      />
      <Box>
        <Text>{user.name}</Text>
        <Text fontSize="xs">
          <b>Email : </b>
          {user.email}
        </Text>
      </Box>
    </Box>
  );
};

export default UserListItem;
