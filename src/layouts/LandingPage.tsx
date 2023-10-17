import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import CustomModal from "../components/Modal";
import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import Footer from "../components/Footer";

export default function LandingPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
    };
  
    return (
    <Flex flexDir={'column'} height={"100svh"}>
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
            onClick={openModal}
          >
            Login
          </Text>
          <Text
            mx={2}
            cursor="pointer"
            onClick={openModal}
          >
            Signup
          </Text>
        </Box>
        <CustomModal isOpen={isModalOpen} onClose={closeModal} />
      </Box>
    <Outlet />
    <Box justifySelf={"end"} marginTop={'auto'}>
        <Footer />
    </Box>
    </Flex>
    );
  }
