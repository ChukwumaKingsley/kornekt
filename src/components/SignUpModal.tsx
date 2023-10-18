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

  const onChange = (e: any) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  }

  const signUpMutation = useSignUp();
  
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
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
            // onClick={switchToSignup}
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
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Username</FormLabel>
                <Input 
                  type="text"
                  placeholder="Enter your username (email)"
                  name='email'
                  value={user.email} 
                  onChange={onChange}
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
              </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={2} onClick={onClose}>
            Cancel
          </Button>
          <Button 
          colorScheme="blue" 
          // onClick={onClose}
          // isLoading={loginMutation.Loading} 
          onClick={() => signUpMutation.mutate(user)}
        >
          {'Signup'}
        </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default SignUpModal;
