import { Box, Button, useDisclosure } from "@chakra-ui/react";
import React from "react";

function Logout(): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleLogout = () => {
    // Prompt the user with a confirmation dialog
    onOpen();
  };

  const confirmLogout = () => {
    // Clear the access token from local storage
    localStorage.removeItem('token');

    // Clear user session and state (if applicable)
    // This may involve dispatching actions to your state management system

    // Redirect to the login page or another appropriate location
    window.location.href = "/home";
  };
}

export default Logout;
