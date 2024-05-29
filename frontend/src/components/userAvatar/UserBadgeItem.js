import { CloseIcon } from "@chakra-ui/icons";
import { Badge } from "@chakra-ui/layout";

const UserBadgeItem = ({user, admin, handleFunction, loggedInUser }) => {
  return (
    <Badge
      px={2}
      py={1}
      borderRadius="lg"
      m={1}
      mb={2}
      variant="solid"
      fontSize={12}
      colorScheme="purple"
      cursor="default"
      >
      {user.name}
      {admin && admin._id === user._id && <span> (Admin)</span>}
      {admin && admin._id === loggedInUser._id && <CloseIcon
        cursor="pointer"
        pl={1} 
        onClick={handleFunction}
        />}
    </Badge>
  );
};

export default UserBadgeItem;
