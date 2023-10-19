import { useState } from 'react';
import {
  Button,
  Modal,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Text,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';

import useSignUp from '../hooks/useSignUp';

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  openLoginModal: () => void;
}


function SignUpModal({ isOpen, onClose, openLoginModal }: SignUpModalProps): JSX.Element {

  const userData = {
    email: '',
    name: '',
    password: '',
    confirmPassword: ''
  }
  
  const [user, setUser] = useState(userData)
  const [isLoading, setIsLoading] = useState(false)
  const [passwordsMatch, setPasswordsMatch] = useState(true); // Track password matching
  
  const onChange = (e: any) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
    setPasswordsMatch(true); // Reset the match state when input changes
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true)
    if (user.password !== user.confirmPassword) {
      setPasswordsMatch(false); // Set the match state to false
      setIsLoading(false)
      return; // Don't proceed with the request
    } else {
      setPasswordsMatch(true); // Passwords match, reset the match state
      signUpMutation.mutate(user);
  }
}

const onSignUpSuccess = () => {
  onClose();
  openLoginModal()
  setIsLoading(false)
  setUser(userData)
};
const onSignUpFail = () => {
  setIsLoading(false)
}
const signUpMutation = useSignUp({onSignUpSuccess, onSignUpFail});
  
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <form onSubmit={handleSubmit}>
        <ModalContent>
          <ModalHeader>
            <Button
              colorScheme="blue"
              variant={'outline'}
              onClick={openLoginModal}
              w="50%"
              borderRadius={0}
              >
              Login
            </Button>
            <Button
              colorScheme="blue"
              variant={'solid'}
              w="50%"
              borderRadius={0}
            >
              Signup
            </Button>
          </ModalHeader>
          <ModalBody>
                <FormControl>
                  <FormLabel>Name</FormLabel>
                  <Input 
                    type="text" 
                    placeholder="Enter your name"
                    value={user.name}
                    name='name'
                    onChange={onChange}
                    required
                  />
                                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Username</FormLabel>
                  <Input 
                    type='email'
                    placeholder="Enter your username (email)"
                    name='email'
                    value={user.email} 
                    onChange={onChange}
                    required
                  />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    placeholder="Enter new password"
                    name='password'
                    value={user.password} 
                    onChange={onChange}
                    required
                  />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Confirm Password</FormLabel>
                  <Input
                    type="password"
                    placeholder="Confirm new password" 
                    name='confirmPassword'
                    value={user.confirmPassword} 
                    onChange={onChange}
                  />
                  {!passwordsMatch && (
                    <Text color="red" fontSize="sm">
                      Passwords do not match
                    </Text>
                  )}
                </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={2} onClick={onClose}>
              Cancel
            </Button>
            <Button 
            type='submit'
            colorScheme="blue"
            isLoading={isLoading}
          >
            {'Signup'}
          </Button>
          
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
}

export default SignUpModal;
