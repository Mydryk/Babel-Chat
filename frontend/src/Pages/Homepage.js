import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useDisclosure,
  ModalOverlay,
  Modal,
  ModalContent,
  ModalBody,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";
import Slogan from "../components/logo/Slogan";
import LogoImage from "../assets/image-3.png";
import "./style.css";

function Homepage() {
  const history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) history.push("/chats");
  }, [history]);

  const OverlayOne = () => (
    <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = useState(<OverlayOne />);

  return (
    <Container maxW="xl" centerContent className="homePage">
      <Box className="logoSlogan">
        <div style={{ width: "100%" }}>
          <img src={LogoImage} alt="Logo" />
        </div>
        <Slogan />
      </Box>
      <button
        className="btn"
        onClick={() => {
          setOverlay(<OverlayOne />);
          onOpen();
        }}
      >
        Get started →
      </button>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        {overlay}
        <ModalContent>
          <ModalBody p={6} className="box">
            <Tabs isFitted variant="enclosed">
              <TabList mb="1em" color={"white"}>
                <Tab
                  _selected={{
                    bg: "linear-gradient(90deg, rgba(255, 102, 0, 1) 0%, rgba(255, 153, 51, 0.7203475140056023) 50%, rgba(255, 204, 102, 0.8660057773109244) 84%)",
                  }}
                >
                  Login
                </Tab>
                <Tab
                  _selected={{
                    bg: "linear-gradient(90deg, rgba(255, 102, 0, 1) 0%, rgba(255, 153, 51, 0.7203475140056023) 50%, rgba(255, 204, 102, 0.8660057773109244) 84%)",
                  }}
                >
                  Sign Up
                </Tab>
              </TabList>
              <TabPanels className="loginSignup">
                <TabPanel>
                  <Login />
                </TabPanel>
                <TabPanel>
                  <Signup />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Container>
  );
}

export default Homepage;
