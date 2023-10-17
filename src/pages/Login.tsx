// src/Login.js

import React, { useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Modal,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';

function Login() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginState, setIsLoginState] = useState(true);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    // Reset the state to login when opening the modal
    setIsLoginState(true);
  };

  const switchState = () => {
    if (!isLoginState) {
      setIsLoginState(true);
    }
  };

  const switchToSignup = () => {
    if (isLoginState) {
      setIsLoginState(false);
    }
  };

  return (
    <Box
      p={4}
      maxW="400px"
      m="auto"
      mt={8}
      bg="white"
      borderRadius="lg"
      boxShadow="lg"
    >
      <Image
        src="your_image_url.jpg" // Replace with your actual image URL
        alt="Meme Image"
        w="100%"
        maxH="200px"
      />
      <Flex justifyContent="center" mt={4}>
        <Button
          colorScheme="blue"
          variant="outline"
          mx={2}
          onClick={toggleModal}
          w="48%" // Width for the "Login" button
        >
          Login
        </Button>
        <Button
          colorScheme="blue"
          mx={2}
          onClick={toggleModal}
          w="48%" // Width for the "Signup" button
        >
          Signup
        </Button>
      </Flex>

      <Modal isOpen={isModalOpen} onClose={toggleModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Button
              colorScheme="blue"
              variant="link"
              onClick={switchState}
              isDisabled={isLoginState}
              w="50%"
            >
              Signup
            </Button>
            <Button
              colorScheme="blue"
              variant="link"
              onClick={switchToSignup}
              isDisabled={!isLoginState}
              w="50%"
            >
              Login
            </Button>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {isLoginState ? (
              <div>
                <FormControl>
                  <FormLabel>Username (Email)</FormLabel>
                  <Input type="text" placeholder="Enter your username (email)" />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Password</FormLabel>
                  <Input type="password" placeholder="Enter your password" />
                </FormControl>
              </div>
            ) : (
              <div>
                <FormControl>
                  <FormLabel>Name</FormLabel>
                  <Input type="text" placeholder="Enter your name" />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Username (Email)</FormLabel>
                  <Input type="text" placeholder="Enter your username (email)" />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Password</FormLabel>
                  <Input type="password" placeholder="Enter your password" />
                </FormControl>
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={toggleModal}>
              {isLoginState ? 'Login' : 'Signup'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default Login;
