import React, { useState } from 'react';
import {
  Button,
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

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function CustomModal({ isOpen, onClose }: CustomModalProps): JSX.Element {
  const [isLoginState, setIsLoginState] = useState(true);

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
    <Modal isOpen={isOpen} onClose={onClose}>
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
          <Button colorScheme="blue" onClick={onClose}>
            {isLoginState ? 'Login' : 'Signup'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default CustomModal;
