import { useEffect, useState } from 'react';
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

import useLogin from '../hooks/useLogin';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  openSignUpModal: () => void
}

function LoginModal({ isOpen, onClose, openSignUpModal }: LoginModalProps): JSX.Element {
  const userData = {
    email: '',
    password: ''
  }
  const [user, setUser] = useState(userData)

  const onChange = (e: any) => {
    setUser({
      ...user,
      [e?.target?.name]: e.target.value
    });
  }
  const loginMutation = useLogin();
  
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Button
            colorScheme="blue"
            variant={'solid'}
            w="50%"
            borderRadius={0}
            >
            Login
          </Button>
          <Button
            colorScheme="blue"
            variant={'outline'}
            onClick={openSignUpModal}
            w="50%"
            borderRadius={0}
          >
            Signup
          </Button>
        </ModalHeader>
        <ModalBody>
              <FormControl>
                <FormLabel>Username</FormLabel>
                <Input 
                  type="text" 
                  value={user.email} 
                  placeholder="Enter your username (email)" 
                  name='email'
                  onChange={onChange} 
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Password</FormLabel>
                <Input 
                  type="password" 
                  placeholder="Enter your password" 
                  name='password'
                  value={user.password} 
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
          // onClick={() => loginMutation.mutate(user)}
        >
          {'Login'}
        </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default LoginModal;
