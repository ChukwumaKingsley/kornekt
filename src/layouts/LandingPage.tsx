import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import LoginModal from "../modals/LoginModal";
import SignUpModal from "../modals/SignUpModal";

export default function LandingPage() {
    const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

    const openLoginModal = () => {
        setIsLoginModalOpen(true);
        setIsSignUpModalOpen(false);
    };
    
    const openSignUpModal = () => {
        setIsSignUpModalOpen(true);
        setIsLoginModalOpen(false);
    };
  
    const closeModal = () => {
      setIsLoginModalOpen(false);
      setIsSignUpModalOpen(false);
    };
  
    return (
    <Flex flexDir={'column'} height={"100svh"} overflowX={'inherit'} wrap={'wrap'}>
      <Box
        p={4}
        bg="blue.500"
        color="white"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        height="20"
      >
        <Heading as={'h1'}>Kornekt</Heading>
        <Box display="flex" alignItems="center">
        <Text
            mx={2}
            cursor="pointer"
          >
            <NavLink to='/'>Home</NavLink>
          </Text>
          <Text
            mx={2}
            cursor="pointer"
          >
            <NavLink to='about'>About</NavLink>
          </Text>
          <Text
            mx={2}
            cursor="pointer"
          >
            <NavLink to='contact'>Help</NavLink>
          </Text>
          <Text
            mx={2}
            cursor="pointer"
            onClick={openLoginModal}
          >
            Login
          </Text>
          <Text
            mx={2}
            cursor="pointer"
            onClick={openSignUpModal}
          >
            Signup
          </Text>
        </Box>
        <SignUpModal isOpen={isSignUpModalOpen} openLoginModal={openLoginModal} onClose={closeModal} />
        <LoginModal isOpen={isLoginModalOpen} openSignUpModal={openSignUpModal} onClose={closeModal} />
      </Box>
    <Outlet />
    <Box justifySelf={"end"} marginTop={'auto'}>
        <Footer />
    </Box>
    </Flex>
    );
  }
