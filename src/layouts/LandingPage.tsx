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

    <Flex flexDir={'column'} height={"100svh"}>
      <Box
        p={'10px'}
        bg="blue.500"
        color="white"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        height="20"
      >
        <Heading as={'h1'} mr={'15px'}>Kornekt</Heading>
        <Box display="flex" alignItems="center" flexWrap={'wrap'}justifyItems={'right'}>
        <Text
            mx={"4px"}
            cursor="pointer"
          >
            <NavLink to='/'>Home</NavLink>
          </Text>
          <Text
            mx={'4px'}
            cursor="pointer"
          >
            <NavLink to='about'>About</NavLink>
          </Text>
          <Text
            mx={"4px"}
            cursor="pointer"
          >
            <NavLink to='contact'>Help</NavLink>
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
