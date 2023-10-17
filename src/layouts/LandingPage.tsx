import { Box, Spacer, Text } from "@chakra-ui/react";
import CustomModal from "../components/Modal";
import Header from "../components/Header";
import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

export default function LandingPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
    };
  
    return (
    <div>
      <Box
        p={4}
        bg="blue.500"
        color="white"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Text fontSize="2xl" fontWeight="bold">
          Kornekt
        </Text>
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
            <NavLink to='contact'>Contact</NavLink>
          </Text>
          <Text
            mx={2}
            cursor="pointer"
            onClick={openModal}
          >
            Login
          </Text>
          {/* <Spacer width="20px" /> */}
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
    </div>
    );
  }
