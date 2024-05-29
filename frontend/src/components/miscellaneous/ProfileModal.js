import { ViewIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  IconButton,
  Text,
  Avatar,
} from "@chakra-ui/react";
import { Box } from "@chakra-ui/layout";
import { useColorModeValue } from "@chakra-ui/react";

const ProfileModal = ({ user, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const secondarybgColor = useColorModeValue("#F8F8F8", "#1D1D1D");

  const loggedInUser = JSON.parse(localStorage.getItem("userInfo"));
  console.log(user);

  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton d={{ base: "flex" }} icon={<ViewIcon />} onClick={onOpen} />
      )}
      <Modal size="lg" onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent w="90%">
          <ModalHeader
            fontSize="1.8rem"
            fontWeight="bold"
            fontFamily="Work sans"
            d="flex"
            justifyContent="center"
            borderBottomWidth="0.1rem"
            borderBottomColor={secondarybgColor}
            pb={1}
            mx={6}
          >
            User Profile
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            d="flex"
            flexDir="column"
            alignItems="center"
            justifyContent="space-between"
            w="100%"
            p={5}
          >
            <Box d="flex" flexDir="row" alignItems="flex-start" w="100%">
              <Box
                d="flex"
                flexDir="column"
                alignItems="center"
                w="40%"
                objectFit="contain"
              >
                <Avatar
                  w={{ base: "5em", md: "6em", lg: "7em" }}
                  h={{ base: "5em", md: "6em", lg: "7em" }}
                  src={user.pic}
                  name={user.name}
                  mb={4}
                />
              </Box>
              <Box d="flex" flexDir="column" ml={6}>
                <Text
                  fontSize={{ base: "1.5rem", md: "2rem" }}
                  fontFamily="Work sans"
                  fontWeight="bold"
                >
                  {user.name}
                </Text>
                <Text
                  fontSize={{ base: "1rem", md: "1.5rem" }}
                  fontFamily="Work sans"
                >
                  {user.email}
                </Text>

                {loggedInUser && loggedInUser._id === user._id ? (
                  <Button
                    h="1.5rem"
                    w="5rem"
                    variant="outline"
                    fontSize={{ base: "0.5rem", md: "0.6rem" }}
                    fontFamily="Work sans"
                    fontWeight="bold"
                    mt={4}
                    disabled={true}
                  >
                    Edit Profile
                  </Button>
                ) : (
                  <></>
                )}
              </Box>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileModal;
